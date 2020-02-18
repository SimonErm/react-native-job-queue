import { RawJob } from './Job';

/**
 * maps typescript to native functions
 */
export interface JobStore {
    addJob(job: RawJob): Promise<void>;
    getJobs(): Promise<RawJob[]>;
    getNextJob(): Promise<RawJob>;
    getJobsForWorker(name: string, count: number): Promise<RawJob[]>;
    updateJob(job: RawJob): void;
    removeJob(job: RawJob): void;
    removeJobsByWorkerName(workerName: string): void;
    deleteAllJobs(): Promise<void>;
}
