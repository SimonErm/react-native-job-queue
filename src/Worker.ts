import { Job } from './models/Job';

export class Worker {
    private name: string;
    private runner: (payload: any) => Promise<any>;
    private onSuccess: (job: Job) => void;
    private onFailure: (job: Job, error: Error) => void;
    private onCompletion: (job: Job) => void;

    constructor(
        name: string,
        runner: (payload: any) => Promise<any>,
        onSuccess = (job: Job) => {},
        onFailure = (job: Job, error: Error) => {},
        onCompletion = (job: Job) => {}
    ) {
        this.name = name;
        this.runner = runner;
        this.onSuccess = onSuccess;
        this.onFailure = onFailure;
        this.onCompletion = onCompletion;
    }
    async execute(job: Job) {
        const { timeout } = job;
        try {
            if (timeout > 0) {
                await this.executeWithTimeout(job, timeout);
            } else {
                await this.runner(JSON.parse(job.payload));
            }
            this.onSuccess(job);
        } catch (error) {
            this.onFailure(job, error);
            throw error;
        } finally {
            this.onCompletion(job);
        }
    }
    async executeWithTimeout(job: Job, timeout: number) {
        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error(`Job ${job.id} timed out`));
            }, timeout);
        });
        await Promise.race([timeoutPromise, this.runner(JSON.parse(job.payload))]);
    }
}
