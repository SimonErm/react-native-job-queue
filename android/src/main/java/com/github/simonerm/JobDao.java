package com.github.simonerm;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface JobDao {
    @Query("SELECT * FROM job")
    List<Job> getAll();

    @Query("SELECT * FROM job WHERE active == 0 AND failed == '' ORDER BY priority DESC,datetime(created) LIMIT 1")
    Job getNextJob();

    @Query("SELECT * FROM job WHERE active == 0 AND failed == '' ORDER BY priority DESC,datetime(created)")
    List<Job> getJobs();

    @Query("SELECT * FROM job WHERE active == 1")
    List<Job> getActiveMarkedJobs();

    @Query("SELECT * FROM job WHERE active == 0 AND failed == '' AND worker_name == :workerName ORDER BY priority DESC,datetime(created) LIMIT :limit")
    List<Job> getJobsForWorker(String workerName, int limit);

    @Query("SELECT * FROM job where id LIKE  :id")
    Job findById(String id);

    @Query("SELECT COUNT(*) from job")
    int countJobs();

    @Update
    void update(Job job);

    @Insert
    void insert(Job job);

    @Delete
    void delete(Job job);

    @Query("DELETE FROM job WHERE worker_name == :workerName")
    void deleteJobsByWorkerName(String workerName);
}
