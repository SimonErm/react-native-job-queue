import { Job } from './Job';

export interface JobStore {
    addJob(job: Job): Promise<void>;
    getJobs(): Promise<Job[]>;
    getNextJob(): Promise<Job>;
    getJobsForWorker(name: string, count: number): Promise<Job[]>;
    updateJob(job: Job): Promise<void>;
    removeJob(job: Job): Promise<void>;
    deleteAllJobs(): Promise<void>;
}
