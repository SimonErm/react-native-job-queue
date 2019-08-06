package com.github.simonerm;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

@Database(entities = {Job.class}, version = 1)
public abstract class JobDatabase extends RoomDatabase {

    private static JobDatabase INSTANCE;

    public abstract JobDao jobDao();

    public static JobDatabase getAppDatabase(Context context) {
        if (INSTANCE == null) {
            INSTANCE =
                    Room.databaseBuilder(context.getApplicationContext(), JobDatabase.class, "job-database")
                            .build();
        }
        return INSTANCE;
    }

    public static void destroyInstance() {
        INSTANCE = null;
    }
}