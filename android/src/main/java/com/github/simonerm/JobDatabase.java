package com.github.simonerm;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.room.migration.Migration;
import androidx.sqlite.db.SupportSQLiteDatabase;

@Database(entities = {Job.class}, version = 1)
public abstract class JobDatabase extends RoomDatabase {

    private static JobDatabase INSTANCE;

    public abstract JobDao jobDao();

    public static JobDatabase getAppDatabase(Context context) {
        if (INSTANCE == null) {
            INSTANCE =
                    Room.databaseBuilder(context.getApplicationContext(), JobDatabase.class, "job-database")
                            .addMigrations(MIGRATION_1_2)
                            .build();
        }
        return INSTANCE;
    }

    public static void destroyInstance() {
        INSTANCE = null;
    }

    static final Migration MIGRATION_1_2 = new Migration(1, 2) {
        @Override
        public void migrate(SupportSQLiteDatabase database) {
            database.execSQL(" CREATE TABLE IF NOT EXISTS Job(" +
                    "id CHAR(36) PRIMARY KEY NOT NULL," +
                    "workerName CHAR(255) NOT NULL," +
                    "active INTEGER NOT NULL," +
                    "payload CHAR(1024)," +
                    "metaData CHAR(1024)," +
                    "attempts INTEGER NOT NULL," +
                    "created CHAR(255)," +
                    "failed CHAR(255)," +
                    "timeout INTEGER NOT NULL," +
                    "priority Integer NOT NULL );");
        }
    };
}