using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactNativeJobQueue
{
    class Job
    {

        string Id { get; set; }
        string WorkerName { get; set; }
        int Active { get; set; }
        string Payload { get; set; }
        string MetaData { get; set; }
        int Attempts { get; set; }
        string Created { get; set; }
        string Failed { get; set; }
        int Timeout { get; set; }
        int Priority { get; set; }


    }
}
