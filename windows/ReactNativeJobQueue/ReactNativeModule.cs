using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.ReactNative;
using Microsoft.ReactNative.Managed;

namespace ReactNativeJobQueue
{
    [ReactModule("JobQueue")]
    internal sealed class ReactNativeModule
    {
        // See https://microsoft.github.io/react-native-windows/docs/native-modules for details on writing native modules

        private ReactContext _reactContext;

        [ReactInitializer]
        public async void InitializeAsync(ReactContext reactContext)
        {
            _reactContext = reactContext;
            await SQLiteDatabase.InitializeDB();
        }

        [ReactMethod("addJob")]
        public void AddJob(Job job)
        {
            SQLiteDatabase.Insert(job);
        }
        [ReactMethod("getJobs")]
        public async Task<List<Job>> getJobs()
        {
            return await SQLiteDatabase.GetAllData();
        }
        [ReactMethod("getActiveMarkedJobs")]
        public async Task<List<Job>> GetActiveMarkedJobs()
        {
            return await SQLiteDatabase.GetActiveMarkedJobs();
        }
        [ReactMethod("getNextJob")]
        public async Task<Job> GetNextJob()
        {
            return await SQLiteDatabase.GetNextJob();
        }
        [ReactMethod("updateJob")]
        public void UpdateJob(Job job)
        {
            SQLiteDatabase.Update(job);
        }
        [ReactMethod("getJobsForWorker")]
        public async Task<List<Job>> GetJobsForWorker(string workerName, int limit)
        {
            return await SQLiteDatabase.GetJobsForWorker(workerName, limit);
        }
        [ReactMethod("removeJob")]
        public void RemoveJob(Job job)
        {
            SQLiteDatabase.DeleteJob(job);
        }
        [ReactMethod("removeJobsByWorkerName")]
        public void RemoveJobsByWorkerName(string workerName)
        {
            SQLiteDatabase.DeleteJobsByWorkerName(workerName);
        }

    }
}
