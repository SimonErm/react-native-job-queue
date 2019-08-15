import Foundation
import SQLite3

@objc(JobQueue)
public class JobQueue:NSObject{
    
    public override init() {
        let db: SQLiteDatabase
        do {
            var path = try FileManager.default.url(for:.libraryDirectory, in: .userDomainMask, appropriateFor: nil, create: true);
            path.appendPathComponent("jobdb")
            db = try SQLiteDatabase.open(path: path.path)
            print("Successfully opened connection to database.")
            do {
                try db.createTable(table: Job.self)
            } catch {
                print(db.errorMessage)
            }
        } catch SQLiteError.OpenDatabase(let message) {
            print("Unable to open database. Verify that you created the directory described in the Getting Started section.")
        } catch {
            print("Unable to open database. Verify that you created the directory described in the Getting Started section.")
        }
        
    }
}
