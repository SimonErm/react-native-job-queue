using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
        public async Task<List<Job>> getJobs(Job job)
        {
            return await SQLiteDatabase.GetAllData();
        }

    }
}
