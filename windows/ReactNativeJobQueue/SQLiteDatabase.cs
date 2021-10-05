using Microsoft.Data.Sqlite;
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

    }
}
