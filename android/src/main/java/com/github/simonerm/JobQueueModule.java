package com.github.simonerm;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;

import java.util.Iterator;
import java.util.List;

public class JobQueueModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public JobQueueModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "JobQueue";
    }

    @ReactMethod
    public void addJob(ReadableMap job) {
        JobDao dao = JobDatabase.getAppDatabase(this.reactContext).jobDao();
        dao.insert(ConversionHelper.getJobFromReadableMap(job));
    }

    @ReactMethod
    public void updateJob(ReadableMap job) {
        JobDao dao = JobDatabase.getAppDatabase(this.reactContext).jobDao();
        dao.update(ConversionHelper.getJobFromReadableMap(job));
    }

    @ReactMethod
    public void removeJob(ReadableMap job) {
        JobDao dao = JobDatabase.getAppDatabase(this.reactContext).jobDao();
        dao.delete(ConversionHelper.getJobFromReadableMap(job));
    }

    @ReactMethod
    public void removeJobsByWorkerName(String workerName) {
        JobDao dao = JobDatabase.getAppDatabase(this.reactContext).jobDao();
        dao.deleteJobsByWorkerName(workerName);
    }

    @ReactMethod
    public void getJobById(String id, Promise promise) {
        JobDao dao = JobDatabase.getAppDatabase(this.reactContext).jobDao();
        Job job = dao.findById(id);
        promise.resolve(ConversionHelper.getJobAsWritableMap(job));
    }

    @ReactMethod
    public void getJobs(Promise promise) {
        JobDao dao = JobDatabase.getAppDatabase(this.reactContext).jobDao();

        List<Job> jobs=dao.getJobs();
        promise.resolve(ConversionHelper.getJobsAsWritableArray(jobs));
    }
    
    @ReactMethod
    public void getActiveMarkedJobs(Promise promise) {
        JobDao dao = JobDatabase.getAppDatabase(this.reactContext).jobDao();

        List<Job> jobs=dao.getActiveMarkedJobs();
        promise.resolve(ConversionHelper.getJobsAsWritableArray(jobs));
    }

    @ReactMethod
    public void getJobsForWorker(String workerName,int limit,Promise promise){
        JobDao dao = JobDatabase.getAppDatabase(this.reactContext).jobDao();

        List<Job> jobsToExecute=dao.getJobsForWorker(workerName,limit);
        Iterator<Job>jobIterator=jobsToExecute.iterator();
        while(jobIterator.hasNext()){
            Job job = jobIterator.next();
            job.setActive(1);
            dao.update(job);
        }
        promise.resolve(ConversionHelper.getJobsAsWritableArray(jobsToExecute));
    }
    @ReactMethod
    public void getNextJob(Promise promise) {
        JobDao dao = JobDatabase.getAppDatabase(this.reactContext).jobDao();

        Job nextJob=dao.getNextJob();
        if(nextJob!=null){
            promise.resolve(ConversionHelper.getJobAsWritableMap(nextJob));
        }else{
            promise.resolve(Arguments.createMap());
        }
    }

}
