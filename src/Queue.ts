import { NativeModules } from 'react-native';
import uuid from 'react-native-uuid';

import { FALSE, Job } from './models/Job';
import { JobStore } from './models/JobStore';
import { Worker } from './Worker';

export class Queue {
    private static queueInstance: Queue | null;

    private jobStore: JobStore;
    private updateInterval: number;
    private activeJobCount: number;
    private workers: { [key: string]: Worker } = {};
    private isActive: boolean;
    private onQueueFinish: () => void;
    private constructor() {
        this.jobStore = NativeModules.JobQueue;
        this.isActive = false;
        this.activeJobCount = 0;
        this.updateInterval = 0;
        this.onQueueFinish = () => {};
    static get instance() {
        if (this.queueInstance) {
            return this.queueInstance;
        } else {
            this.queueInstance = new Queue();
            return this.queueInstance;
        }
    }
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
    async start() {
        this.isActive = true;

        this.updateInterval = setInterval(async () => {
            const nextJob = await this.jobStore.getNextJob();
            if (!this.isActive) {
                this.finishQueue();
            }

            if (Object.keys(nextJob).length > 0) {
                const nextJobs = await this.getJobsByWorker(nextJob);
                const processingJobs = nextJobs.map(this.excuteJob);
                Promise.all(processingJobs);
            } else if (!(this.activeJobCount > 0)) {
                this.finishQueue();
            }
        }, 10);
    }
    stop() {
        this.isActive = false;
    }
    private finishQueue() {
        this.onQueueFinish();
        this.isActive = false;
        clearInterval(this.updateInterval);
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
            let failed = '';
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
export default Queue.instance;
