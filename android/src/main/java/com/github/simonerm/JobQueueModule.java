package com.github.simonerm;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;

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
    public void addJob(ReadableMap job, Promise promise) {

    }

    @ReactMethod
    public void getJobById(String id, Promise promise) {

    }

}
