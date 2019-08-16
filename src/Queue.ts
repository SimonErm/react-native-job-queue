import { NativeModules } from 'react-native';
import uuid from 'react-native-uuid';

import { FALSE, Job } from './models/Job';
import { JobStore } from './models/JobStore';
import { Worker } from './Worker';

export interface QueueOptions {
    onQueueFinish?: (executedJobs: Job[]) => void;
    updateInterval?: number;
}
export class Queue {
    private static queueInstance: Queue | null;

    private jobStore: JobStore;
    private workers: { [key: string]: Worker };
    private isActive: boolean;

    private intervalId: number;
    private executedJobs: Job[];
    private activeJobCount: number;

    private updateInterval: number;
    private onQueueFinish: (executedJobs: Job[]) => void;

    private constructor() {
        this.jobStore = NativeModules.JobQueue;
        this.workers = {};
        this.isActive = false;

        this.intervalId = 0;
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

    get isRunning() {
        return this.isActive;
    }

    get registeredWorkers() {
        return this.workers;
    }

    async getJobs() {
        return await this.jobStore.getJobs();
    }

    configure(options: QueueOptions) {
        const { onQueueFinish = (executedJobs: Job[]) => {}, updateInterval = 10 } = options;
        this.onQueueFinish = onQueueFinish;
        this.updateInterval = updateInterval;
    }

    addWorker(worker: Worker) {
        if (this.workers[worker.name]) {
            throw new Error(`Worker "${worker.name}" already exists.`);
        }
        this.workers[worker.name] = worker;
    }

    removeWorker(name: string, deleteRelatedJobs: boolean = false) {
        delete this.workers[name];
    }

    addJob(
        workerName: string,
        payload: any = {},
        options = { attempts: 0, timeout: 0, priority: 0 },
        startQueue: boolean = true
    ) {
        const { attempts = 0, timeout = 0, priority = 0 } = options;
        const job: Job = {
            id: uuid.v4(),
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

    start() {
        if (!this.isActive) {
            this.isActive = true;
            this.executedJobs = [];

            this.intervalId = setInterval(this.runQueue, this.updateInterval);
        }
    }

    stop() {
        this.isActive = false;
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
        clearInterval(this.intervalId);
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
            let nextJobs:Job[]=[]
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
