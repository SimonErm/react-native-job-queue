import { NativeModules } from 'react-native';
import uuid from 'react-native-uuid';

import { FALSE, Job } from './models/Job';
import { JobStore } from './models/JobStore';
import { Worker } from './Worker';

export class Queue {
    private jobStore: JobStore;
    private activeJobCount: number;
    private workers: { [key: string]: Worker } = {};
    private isActive: boolean;
    private onQueueFinish: () => void;
    constructor() {
        this.jobStore = NativeModules.JobQueue;
        this.isActive = false;
        this.activeJobCount = 0;
        this.onQueueFinish = () => {};
    }
    addWorker(worker: Worker) {
        if (this.workers[worker.name]) {
            throw new Error(`Worker "${worker.name}" already exists.`);
        }
        this.workers[worker.name] = worker;
    }
    getWorkers() {
        return this.workers;
    }
    removeWorker(name: string, deleteRelatedJobs: boolean = false) {
        delete this.workers[name];
    }
    async addJob(
        workerName: string,
        payload: any,
        options = { attempts: 0, timeout: 0, priority: 0 },
        startQueue: boolean = true
    ) {
        const { attempts, timeout, priority } = options;
        const job: Job = {
            id: uuid.v4(),
            payload: JSON.stringify(payload),
            metaData: JSON.stringify({ faileAttempts: 0, errors: [] }),
            active: FALSE,
            created: new Date().toISOString(),
            failed: undefined,
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
    async start() {
        this.isActive = true;
        let nextJob = await this.jobStore.getNextJob();
        while (this.isActive && (Object.keys(nextJob).length > 0 || this.activeJobCount > 0)) {
            const nextJobs = await this.getJobsByWorker(nextJob);
            const processingJobs = nextJobs.map(this.excuteJob);
            Promise.all(processingJobs);

            nextJob = await this.jobStore.getNextJob();
        }
        this.onQueueFinish();
        this.isActive = false;
    }
    stop() {
        this.isActive = false;
    }
    private getJobsByWorker = async (job: Job) => {
        const { isBusy, availableExecuters } = this.workers[job.workerName];
        if (!isBusy) {
            return await this.jobStore.getJobsForWorker(job.workerName, availableExecuters);
        }
        return [];
    };
    private excuteJob = async (job: Job) => {
        try {
            this.activeJobCount++;
            if (!this.workers[job.workerName]) {
                throw new Error(`Missing worker with name ${job.workerName}`);
            }
            await this.workers[job.workerName].execute(job);
            this.jobStore.removeJob(job);
        } catch (error) {
            // tslint:disable-next-line: prefer-const
            const { attempts } = job;
            let { errors, failedAttempts } = JSON.parse(job.metaData);
            failedAttempts++;
            let failed;
            if (failedAttempts > attempts) {
                failed = new Date().toISOString();
            }
            const metaData = JSON.stringify({ errors: [...errors, error], failedAttempts });
            this.jobStore.updateJob({ ...job, ...{ active: FALSE, metaData, failed } });
        } finally {
            this.activeJobCount--;
        }
    };
}
const queue = new Queue();
export default queue;
