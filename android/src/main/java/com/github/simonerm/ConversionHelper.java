package com.github.simonerm;

import android.os.Bundle;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ConversionHelper {

    public static WritableMap getJobAsWritableMap(Job job){

        return Arguments.fromBundle(getJobAsBundle(job));
    }
    public static WritableArray getJobsAsWritableArray(List<Job> jobs){
        List<Bundle> jobsAsBundleList =new ArrayList<>();
        Iterator<Job> jobIterable=jobs.iterator();
        while(jobIterable.hasNext()){
            Job job =jobIterable.next();
            jobsAsBundleList.add(getJobAsBundle(job));
        }

        return Arguments.fromArray(jobsAsBundleList.toArray(new Bundle[jobsAsBundleList.size()]));
    }
    public static Job getJobFromReadableMap(ReadableMap jobAsMap){
        Job job = new Job();
        job.setId(jobAsMap.getString("id"));
        job.setWorkerName(jobAsMap.getString("workerName"));
        job.setActive(jobAsMap.getInt("active"));
        job.setPayload(jobAsMap.getString("payload"));
        job.setAttempts(jobAsMap.getInt("attempts"));
        job.setMetaData(jobAsMap.getString("metaData"));
        job.setTimeout(jobAsMap.getInt("timeout"));
        job.setPriority(jobAsMap.getInt("priority"));
        job.setCreated(jobAsMap.getString("created"));
        if(jobAsMap.hasKey("failed")){
            job.setFailed(jobAsMap.getString("failed"));
        }else{
            job.setFailed(null);
        }
        return job;
    }
    private static Bundle getJobAsBundle(Job job){
        Bundle jobAsBundle =new Bundle();
        jobAsBundle.putString("id",job.getId());
        jobAsBundle.putString("workerName",job.getWorkerName());
        jobAsBundle.putInt("active",job.getActive());
        jobAsBundle.putString("payload",job.getPayload());
        jobAsBundle.putString("metaData",job.getMetaData());
        jobAsBundle.putInt("attempts",job.getAttempts());
        jobAsBundle.putInt("timeout",job.getTimeout());
        jobAsBundle.putInt("priority",job.getPriority());
        jobAsBundle.putString("created",job.getCreated());
        jobAsBundle.putString("failed",job.getFailed());
        return  jobAsBundle;
    }
}
