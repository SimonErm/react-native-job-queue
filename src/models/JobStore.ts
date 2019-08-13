import { Job } from './Job';

export interface JobStore {
    addJob(job: Job): Promise<void>;
    getJobs(): Promise<Job[]>;
    getJobsToExecute(): Promise<Job[]>;
    getJobsForWorker(name: string, count: number): Promise<Job[]>;
    updateJob(job: Job): Promise<void>;
    deleteJob(job: Job): Promise<void>;
    deleteAllJobs(): Promise<void>;
}
