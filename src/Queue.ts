import promiseReflect from 'promise-reflect';
import { NativeModules } from 'react-native';
import uuid from 'react-native-uuid';

import { FALSE, Job } from './models/Job';
import { JobStore } from './models/JobStore';
import { Worker } from './Worker';

export class Queue {
    private jobStore: JobStore;
    private workers: { [key: string]: Worker } = {};
    private isActive: boolean;
    private onQueueFinish: () => void;
    constructor() {
        this.jobStore = NativeModules.JobQueue;
        this.isActive = false;
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
    async addJob(workerName: string, payload: any, options = { attempts: 0, timeout: 0 }, startQueue: boolean = true) {
        const { attempts, timeout } = options;
        const job: Job = {
            id: uuid.v4(),
            payload: JSON.stringify(payload),
            metaData: JSON.stringify({ faileAttempts: 0, errors: [] }),
            active: FALSE,
            created: new Date().toISOString(),
            success: FALSE,
            failed: undefined,
            workerName,
            attempts,
            timeout
        };
        if (job.workerName) {
            throw new Error(`Missing worker with name ${job.workerName}`);
        }

        await this.jobStore.addJob(job);
        if (startQueue && !this.isActive) {
            this.start();
        }
    }
    async start() {
        this.isActive = true;
        let queuedJobs = await this.jobStore.getJobsToExecute();
        while (this.isActive && queuedJobs.length > 0) {
            const nextJobs = await this.getJobsByWorker(queuedJobs[0]);

            const processingJobs = nextJobs.map(this.excuteJob);

            await Promise.all(processingJobs.map(promiseReflect));

            queuedJobs = await this.jobStore.getJobsToExecute();
        }
        this.onQueueFinish();
        this.isActive = false;
    }
    stop() {
        this.isActive = false;
    }
    getJobsByWorker = async (job: Job) => {
        const { isBusy, availableExecuters } = this.workers[job.workerName];
        if (!isBusy) {
            return await this.jobStore.getJobsForWorker(job.workerName, availableExecuters);
        }
        return [];
    };
    private excuteJob = async (job: Job) => {
        if (this.workers[job.workerName]) {
            try {
                await this.workers[job.workerName].execute(job);
                this.jobStore.deleteJob(job);
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
            }
        } else {
            Promise.reject(new Error(`No worker with name ${job.workerName} found`));
        }
    };
}
