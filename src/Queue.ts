import { NativeModules } from 'react-native';

import { FALSE, Job } from './models/Job';
import { JobStore } from './models/JobStore';
import { Uuid } from './utils/Uuid';
import { Worker } from './Worker';

/**
 * Options to configure the queue
 */
export interface QueueOptions {
    /**
     * A callback function which is called after the queue has been stopped
     * @parameter executedJobs
     */
    onQueueFinish?: (executedJobs: Job[]) => void;
    /**
     * Interval in which the queue checks for new jobs to execute
     */
    updateInterval?: number;
}
/**
 * ## Usage
 *
 * ```typescript
 * import queue from 'react-native-job-queue'
 *
 * queue.configure({onQueueFinish:(executedJobs:Job[])=>{
 *      console.log("Queue stopped and executed",executedJobs)
 * }});
 * queue.addWorker(new Worker("testWorker",async(payload)=>{
 *      return new Promise((resolve) => {
 *      setTimeout(() => {
 *          console.log(payload.text);
 *          resolve();
 *      }, payload.delay);});
 * }))
 * queue.addJob("testWorker",{text:"Job example palyoad content text",delay:5000})
 * ```
 */
export class Queue {
    private static queueInstance: Queue | null;

    private jobStore: JobStore;
    private workers: { [key: string]: Worker };
    private isActive: boolean;

    private timeoutId: number;
    private executedJobs: Job[];
    private activeJobCount: number;

    private updateInterval: number;
    private onQueueFinish: (executedJobs: Job[]) => void;

    private constructor() {
        this.jobStore = NativeModules.JobQueue;
        this.workers = {};
        this.isActive = false;

        this.timeoutId = 0;
        this.executedJobs = [];
        this.activeJobCount = 0;

        this.updateInterval = 10;
        this.onQueueFinish = (executedJobs: Job[]) => {};
    }

    static get instance() {
        if (this.queueInstance) {
            return this.queueInstance;
        } else {
            this.queueInstance = new Queue();
            return this.queueInstance;
        }
    }
    /**
     * @returns true if the Queue is running and false otherwise
     */
    get isRunning() {
        return this.isActive;
    }
    /**
     * @returns the workers map (readonly)
     */
    get registeredWorkers() {
        return this.workers;
    }
    /**
     * @returns a promise that resolves all jobs that are queued and not active
     */
    async getJobs() {
        return await this.jobStore.getJobs();
    }

    configure(options: QueueOptions) {
        const { onQueueFinish = (executedJobs: Job[]) => {}, updateInterval = 10 } = options;
        this.onQueueFinish = onQueueFinish;
        this.updateInterval = updateInterval;
    }
    /**
     * adds a [[Worker]] to the queue which can execute Jobs
     * @param worker
     */
    addWorker(worker: Worker) {
        if (this.workers[worker.name]) {
            throw new Error(`Worker "${worker.name}" already exists.`);
        }
        this.workers[worker.name] = worker;
    }

    /**
     * removes worker from queue
     *
     * @param name
     * @param [deleteRelatedJobs=false] removes all queued jobs releated to the worker if set to true
     */
    removeWorker(name: string, deleteRelatedJobs: boolean = false) {
        delete this.workers[name];
        if (deleteRelatedJobs) {
            this.jobStore.removeJobsByWorkerName(name);
        }
    }

    /**
     * adds a job to the queue
     * @param workerName name of the worker which should be used to excute the job
     * @param [payload={}] payload which is passed as parameter to the executer
     * @param [options={ attempts: 0, timeout: 0, priority: 0 }] options to set max attempts, a timeout and a priority
     * @param [startQueue=true] if set to false the queue won't start automaticly when adding a job
     */
    addJob(
        workerName: string,
        payload: any = {},
        options = { attempts: 0, timeout: 0, priority: 0 },
        startQueue: boolean = true
    ) {
        const { attempts = 0, timeout = 0, priority = 0 } = options;
        const job: Job = {
            id: Uuid.v4(),
            payload: JSON.stringify(payload),
            metaData: JSON.stringify({ faileAttempts: 0, errors: [] }),
            active: FALSE,
            created: new Date().toISOString(),
            failed: '',
            workerName,
            attempts,
            timeout,
            priority
        };
        if (!this.workers[job.workerName]) {
            throw new Error(`Missing worker with name ${job.workerName}`);
        }

        this.jobStore.addJob(job);
        if (startQueue && !this.isActive) {
            this.start();
        }
    }

    /**
     * starts the queue to execute queued jobs
     */
    start() {
        if (!this.isActive) {
            this.isActive = true;
            this.executedJobs = [];

            this.scheduleQueue();
        }
    }
    /**
     * stop the queue from executing queued jobs
     */
    stop() {
        this.isActive = false;
    }
    private scheduleQueue() {
        this.timeoutId = setTimeout(this.runQueue, this.updateInterval);
    }
    private runQueue = async () => {
        const nextJob = await this.jobStore.getNextJob();
        if (!this.isActive) {
            this.finishQueue();
        }
        if (this.isJobNotEmpty(nextJob)) {
            const nextJobs = await this.getJobsForWorker(nextJob.workerName);
            const processingJobs = nextJobs.map(this.excuteJob);
            Promise.all(processingJobs);
        } else if (!this.isExecuting()) {
            this.finishQueue();
        }
        this.scheduleQueue();
    };

    private isJobNotEmpty(job: Job | {}) {
        return Object.keys(job).length > 0;
    }

    private isExecuting() {
        return this.activeJobCount > 0;
    }

    private finishQueue() {
        this.onQueueFinish(this.executedJobs);
        this.isActive = false;
        clearTimeout(this.timeoutId);
    }

    private async getJobsForWorker(workerName: string) {
        const { isBusy, availableExecuters } = this.workers[workerName];
        if (!isBusy) {
            return await this.jobStore.getJobsForWorker(workerName, availableExecuters);
        } else {
            return await this.getJobsForAlternateWorker();
        }
    }

    private async getJobsForAlternateWorker() {
        for (const workerName of Object.keys(this.workers)) {
            const { isBusy, availableExecuters } = this.workers[workerName];
            let nextJobs: Job[] = [];
            if (!isBusy) {
                nextJobs = await this.jobStore.getJobsForWorker(workerName, availableExecuters);
            }
            if (nextJobs.length > 0) {
                return nextJobs;
            }
        }
        return [];
    }

    private excuteJob = async (job: Job) => {
        try {
            this.activeJobCount++;
            if (!this.workers[job.workerName]) {
                throw new Error(`Missing worker with name ${job.workerName}`);
            }
            await this.workers[job.workerName].execute(job);
            this.jobStore.removeJob(job);
        } catch (error) {
            const { attempts } = job;
            // tslint:disable-next-line: prefer-const
            let { errors, failedAttempts } = JSON.parse(job.metaData);
            failedAttempts++;
            let failed = '';
            if (failedAttempts > attempts) {
                failed = new Date().toISOString();
            }
            const metaData = JSON.stringify({ errors: [...errors, error], failedAttempts });
            this.jobStore.updateJob({ ...job, ...{ active: FALSE, metaData, failed } });
        } finally {
            this.executedJobs.push(job);
            this.activeJobCount--;
        }
    };
}
export default Queue.instance;
