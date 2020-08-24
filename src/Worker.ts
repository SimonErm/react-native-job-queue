import { Job, RawJob } from './models/Job';

export interface WorkerOptions<P extends object> {
    onStart?: (job: Job<P>) => void;
    onSuccess?: (job: Job<P>) => void;
    onFailure?: (job: Job<P>, error: Error) => void;
    onCompletion?: (job: Job<P>) => void;
    concurrency?: number;
}
/**
 * @typeparam P specifies the Type of the Job-Payload.
 */
export class Worker<P extends object> {
    public readonly name: string;
    public readonly concurrency: number;

    private executionCount: number;
    private executer: (payload: P) => Promise<any>;

    private onStart: (job: Job<P>) => void;
    private onSuccess: (job: Job<P>) => void;
    private onFailure: (job: Job<P>, error: Error) => void;
    private onCompletion: (job: Job<P>) => void;

    /**
     *
     * @typeparam P specifies the type of the job-payload.
     * @param name of worker
     * @param executer function to run jobs
     * @param options to configure worker
     */
    constructor(name: string, executer: (payload: P) => Promise<any>, options: WorkerOptions<P> = {}) {
        const {
            onStart = (job: Job<P>) => {},
            onSuccess = (job: Job<P>) => {},
            onFailure = (job: Job<P>, error: Error) => {},
            onCompletion = (job: Job<P>) => {},
            concurrency = 5
        } = options;

        this.name = name;
        this.concurrency = concurrency;

        this.executionCount = 0;
        this.executer = executer;

        this.onStart = onStart;
        this.onSuccess = onSuccess;
        this.onFailure = onFailure;
        this.onCompletion = onCompletion;
    }

    /**
     * @returns true if worker runs max concurrent amout of jobs
     */
    get isBusy() {
        return this.executionCount === this.concurrency;
    }
    /**
     * @returns amount of available Executers for current worker
     */
    get availableExecuters() {
        return this.concurrency - this.executionCount;
    }
    /**
     * This method should not be invoked manually and is used by the queue to execute jobs
     * @param job to be executed
     */
    async execute(rawJob: RawJob) {
        const { timeout } = rawJob;
        const payload: P = JSON.parse(rawJob.payload);
        const job = { ...rawJob, ...{ payload } };
        this.executionCount++;
        try {
            this.onStart(job);
            if (timeout > 0) {
                await this.executeWithTimeout(job, timeout);
            } else {
                await this.executer(payload);
            }
            this.onSuccess(job);
        } catch (error) {
            this.onFailure(job, error);
            throw error;
        } finally {
            this.executionCount--;
            this.onCompletion(job);
        }
    }
    private async executeWithTimeout(job: Job<P>, timeout: number) {
        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error(`Job ${job.id} timed out`));
            }, timeout);
        });
        // TODO: race doesn't cancel the executer
        await Promise.race([timeoutPromise, this.executer(job.payload)]);
    }
}
