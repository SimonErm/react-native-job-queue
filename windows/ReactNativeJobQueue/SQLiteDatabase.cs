﻿using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Windows.Storage;

namespace ReactNativeJobQueue
{
    class SQLiteDatabase
    {
        static readonly string dbName = "jobdb.db"; // name of databse

        static readonly string createTableSQLStatement = @"CREATE TABLE IF NOT EXISTS Job(
        id CHAR(36) PRIMARY KEY NOT NULL,
        worker_name CHAR(255) NOT NULL,
        active INTEGER NOT NULL,
        payload CHAR(1024),
        meta_data CHAR(1024),
        attempts INTEGER NOT NULL,
        created CHAR(255),
        failed CHAR(255),
        timeout INTEGER NOT NULL,
        priority Integer NOT NULL
        );";
       public static async Task InitializeDB()
        {
            // Create the database
            await ApplicationData.Current.LocalFolder.CreateFileAsync(dbName, CreationCollisionOption.OpenIfExists);
            string dbpath = Path.Combine(ApplicationData.Current.LocalFolder.Path, dbName);
            using (SqliteConnection db =
               new SqliteConnection($"Filename={dbpath}"))
            {
                db.Open();

                // create the table
                SqliteCommand createTable = new SqliteCommand(createTableSQLStatement, db);
                createTable.ExecuteReader();
            }
        }

        public static void Insert(Job job)
        {
            string insertSql = "INSERT INTO Job (id, worker_name, active, payload, meta_data, attempts, created, failed,timeout,priority) VALUES (@id, @workerName, @active, @payload, @metaData, @attempts, @created, @failed, @timeout, @priority);";

            string dbpath = Path.Combine(ApplicationData.Current.LocalFolder.Path, dbName);
            using (SqliteConnection db =
              new SqliteConnection($"Filename={dbpath}"))
            {
                db.Open();

                SqliteCommand insertCommand = new SqliteCommand();
                insertCommand.Connection = db;

                // Use parameterized query to prevent SQL injection attacks
                insertCommand.CommandText = insertSql;
                insertCommand.Parameters.AddWithValue("@id", job.id);
                insertCommand.Parameters.AddWithValue("@workerName", job.workerName);
                insertCommand.Parameters.AddWithValue("@active", job.active);
                insertCommand.Parameters.AddWithValue("@payload", job.payload);
                insertCommand.Parameters.AddWithValue("@metaData", job.metaData);
                insertCommand.Parameters.AddWithValue("@attempts", job.attempts);
                insertCommand.Parameters.AddWithValue("@created", job.created);
                insertCommand.Parameters.AddWithValue("@failed", job.failed);
                insertCommand.Parameters.AddWithValue("@timeout", job.timeout);
                insertCommand.Parameters.AddWithValue("@priority", job.priority);

                insertCommand.ExecuteReader();

                db.Close();
            }
        }
        public static async Task<List<Job>> GetAllData()
        {
            List<Job> entries = new List<Job>();

            string dbpath = Path.Combine(ApplicationData.Current.LocalFolder.Path, dbName);
            using (SqliteConnection db =
               new SqliteConnection($"Filename={dbpath}"))
            {
                db.Open();

                SqliteCommand selectCommand = new SqliteCommand
                    ("SELECT * from Job", db);

                SqliteDataReader query = selectCommand.ExecuteReader();

                while (query.Read())
                {
                    Job newJob = convertQueryResultsToJob(query);
                    entries.Add(newJob);
                }

                db.Close();
            }

            return entries;
        }
        public static async Task<List<Job>> GetActiveMarkedJobs()
        {
            List<Job> entries = new List<Job>();

            string dbpath = Path.Combine(ApplicationData.Current.LocalFolder.Path, dbName);
            using (SqliteConnection db =
               new SqliteConnection($"Filename={dbpath}"))
            {
                db.Open();

                SqliteCommand selectCommand = new SqliteCommand
                    ("SELECT * from Job WHERE active == 1", db);

                SqliteDataReader query = selectCommand.ExecuteReader();

                while (query.Read())
                {
                    Job newJob = convertQueryResultsToJob(query);
                    entries.Add(newJob);
                }

                db.Close();
            }

            return entries;
        }
        public static async Task<Job> GetNextJob()
        {
            Job nextJob = new Job();

            string dbpath = Path.Combine(ApplicationData.Current.LocalFolder.Path, dbName);
            using (SqliteConnection db =
               new SqliteConnection($"Filename={dbpath}"))
            {
                db.Open();

                SqliteCommand selectCommand = new SqliteCommand
                    ("SELECT * FROM Job WHERE active == 0 AND failed == '' ORDER BY priority DESC,datetime(created) LIMIT 1", db);

                SqliteDataReader query = selectCommand.ExecuteReader();

                while (query.Read())
                {
                    nextJob = convertQueryResultsToJob(query);
                }

                db.Close();
            }

            return nextJob;
        }
        public static void Update(Job job)
        {
            string updateQuery = "UPDATE job SET active = @active, failed = @failed, meta_data = @metaData, attempts = @attempts WHERE id = @id;";

            string dbpath = Path.Combine(ApplicationData.Current.LocalFolder.Path, dbName);
            using (SqliteConnection db =
              new SqliteConnection($"Filename={dbpath}"))
            {
                db.Open();

                SqliteCommand updateCommand = new SqliteCommand();
                updateCommand.Connection = db;

                // Use parameterized query to prevent SQL injection attacks
                updateCommand.CommandText = updateQuery;
                updateCommand.Parameters.AddWithValue("@active", job.active);
                updateCommand.Parameters.AddWithValue("@failed", job.failed);
                updateCommand.Parameters.AddWithValue("@metaData", job.metaData);
                updateCommand.Parameters.AddWithValue("@attempts", job.attempts);
                updateCommand.Parameters.AddWithValue("@id", job.id);

                updateCommand.ExecuteReader();

                db.Close();
            }
        }

        static Job convertQueryResultsToJob(SqliteDataReader query)
        {
            Job newJob = new Job
            {
                id = query["id"].ToString(),
                workerName = query["worker_name"].ToString(),
                active = query.GetInt32(2),
                payload = query["payload"].ToString(),
                metaData = query["meta_data"].ToString(),
                attempts = query.GetInt32(4),
                created = query["created"].ToString(),
                failed = query["failed"].ToString(),
                timeout = (int)(long)query["timeout"],
                priority = (int)(long)query["priority"],

            };

            return newJob;
        }

    }
}
