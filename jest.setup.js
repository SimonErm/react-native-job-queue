import { NativeModules } from 'react-native';

NativeModules.JobQueue = { getJobsToExecute: jest.fn(), deleteJob: jest.fn(), updateJob: jest.fn() };
NativeModules.JobQueue.getJobsToExecute.mockResolvedValueOnce([
    {
        id: '123-12313',
        workerName: 'testWorker',
        active: 1,
        payload: JSON.stringify({ bla: 'tedt' }),
        metaData: JSON.stringify({ errors: [], failedAttempts: 0 }),
        attempts: 1,
        created: new Date().toISOString(),
        success: 0,
        timeout: 5000
    }
]);
