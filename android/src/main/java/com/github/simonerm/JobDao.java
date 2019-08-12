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

    @Query("SELECT * FROM job WHERE active == 0 AND failed != NULL ORDER BY priority,datetime(created)")
    List<Job> getJobsToExecute();

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
}
