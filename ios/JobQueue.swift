import Foundation
import SQLite3

@objc(JobQueue)
public class JobQueue:NSObject{
    var db: SQLiteDatabase?;
    public override init() {
        super.init()
        do {
            var path = try FileManager.default.url(for:.libraryDirectory, in: .userDomainMask, appropriateFor: nil, create: true);
            path.appendPathComponent("jobdb")
            db = try SQLiteDatabase.open(path: path.path)
            print("Successfully opened connection to database.")
            do {
                try db!.createTable(table: Job.self)
            } catch {
                print(db!.errorMessage)
            }
        } catch SQLiteError.OpenDatabase(let message) {
            print("Unable to open database. Verify that you created the directory described in the Getting Started section.",message)
        } catch {
            print("Unable to open database. Verify that you created the directory described in the Getting Started section.")
        }
        
    }
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
