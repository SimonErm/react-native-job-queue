import { Job, RawJob } from './models/Job';

export const CANCEL = 'rn_job_queue_cancel'

export interface WorkerOptions<P extends object> {
    onStart?: (job: Job<P>) => void;
    onSuccess?: (job: Job<P>) => void;
    onFailure?: (job: Job<P>, error: Error) => void;
    onCompletion?: (job: Job<P>) => void;
    concurrency?: number;
}

export interface CancellablePromise<T> extends Promise<T> {
  rn_job_queue_cancel?: () => void
}
/**
 * @typeparam P specifies the Type of the Job-Payload.
 */
export class Worker<P extends object> {
    public readonly name: string;
    public readonly concurrency: number;

    private executionCount: number;
    private executer: (payload: P) => CancellablePromise<any>;

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
    execute(rawJob: RawJob) {
        const { timeout } = rawJob;
        const payload: P = JSON.parse(rawJob.payload);
        const job = { ...rawJob, ...{ payload } };
        this.executionCount++;
        this.onStart(job);
        if (timeout > 0) {
            return this.executeWithTimeout(job, timeout);
        } else {
            return this.executer(payload);
        }
    }
    private executeWithTimeout(job: Job<P>, timeout: number) {
      let cancel
      const promise: CancellablePromise<any> = new Promise(async (resolve, reject) => {
        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error(`Job ${job.id} timed out`));
            }, timeout);
        });
        const executerPromise = this.executer(job.payload)
        if (executerPromise) {
          cancel = executerPromise[CANCEL]
          try {
            await Promise.race([timeoutPromise, executerPromise]);
            resolve()
          } catch (error) {
            // cancel task if has cancel method
            if (executerPromise[CANCEL] && typeof executerPromise[CANCEL] === 'function') {
              executerPromise[CANCEL]!()
            }
            reject(error);
          }
        }
      })
      promise[CANCEL] = cancel
      return promise
    }

    makeSuccess(job: Job<P>) {
      this.onSuccess(job)
    }
    makeFailure(job: Job<P>, error: Error) {
      this.onFailure(job, error)
    }
    makeCompletion(job: Job<P>) {
      this.onCompletion(job)
    }
    decreaseExecutionCount() {
      this.executionCount--;
    }
}
