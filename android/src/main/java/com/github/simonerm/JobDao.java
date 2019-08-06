package com.github.simonerm;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;

import java.util.List;

@Dao
public interface JobDao {
    @Query("SELECT * FROM job")
    List<Job> getAll();

    @Query("SELECT * FROM job")
    List<Job> getJobsToFinish();

    @Query("SELECT * FROM job where id LIKE  :id")
    Job findById(String id);

    @Query("SELECT COUNT(*) from job")
    int countJobs();

    @Insert
    void insertAll(Job... jobs);

    @Delete
    void delete(Job job);
}
