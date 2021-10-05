using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactNativeJobQueue
{
    class Job
    {

        // All properties are lower-case to match JS. Uppercase causes Job objects in JS to convert to Null in C#
        public string id { get; set; }
        public string workerName { get; set; }
        public int active { get; set; }
        public string payload { get; set; }
        public string metaData { get; set; }
        public int attempts { get; set; }
        public string created { get; set; }
        public string failed { get; set; }
        public int timeout { get; set; }
        public int priority { get; set; }


    }
}
