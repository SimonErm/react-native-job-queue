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
    
    @objc
    public func addJob(_ job:[String:Any]){
        if(db != nil){
            do{
                try db?.add(job: Job.createJobFromDictionary(job: job))
            }catch{
                print("Couln't add Job to Database: ",error)
            }
        }
    }
    
    @objc
    public func removeJob(_ job:[String:Any]){
        if(db != nil){
            do{
                try db?.delete(job: Job.createJobFromDictionary(job: job))
            }catch{
                print("Couln't remove job Job to Database: ",error)
            }
        }
    }
    @objc
    public func removeJobsByWorkerName(_ workerName:String){
        if(db != nil){
            do{
                try db?.deleteJobsByWorkerName(workerName:workerName as NSString)
            }catch{
                print("Couln't remove job Job to Database: ",error)
            }
        }
    }
    @objc
    public func updateJob(_ job:[String:Any]){
        if(db != nil){
            do{
                try db?.update(job: Job.createJobFromDictionary(job: job))
            }catch{
                print("Couln't update job Job to Database: ",error)
            }
        }
    }
    
    @objc
    public func getNextJob(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock){
        if(db != nil){
            if let job =  db?.getNextJob(){
                resolve(job.toDictionary())
            }else{
                resolve([String:Any]())
            }
            
        }
    }
    
    @objc
    public func getJobsForWorker(_ name:String, count:Int, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock){
        if(db != nil){
            if let jobs =  db?.getJobsForWorker(name: name as NSString, count: Int32(count)){
                var jobsAsDictionaryArray=[[String:Any]]()
                for job in jobs{
                    var job=job
                    job.active = 1
                    do{
                        try db?.update(job: job)
                        jobsAsDictionaryArray.append(job.toDictionary())
                    }catch{
                        print("Couln't update job Job to Database: ",error)
                    }
                    
                }
                resolve(jobsAsDictionaryArray)
            }else{
                resolve([[String:Any]]())
            }
            
        }
    }
    
    @objc
    public func getJobs(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock){
        if(db != nil){
            if let jobs =  db?.getJobs(){
                var jobsAsDictionaryArray=[[String:Any]]()
                for job in jobs{
                    jobsAsDictionaryArray.append(job.toDictionary())
                }
                resolve(jobsAsDictionaryArray)
            }else{
                resolve([[String:Any]]())
            }
            
        }
    }

    @objc
    public func getActiveMarkedJobs(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock){
        if(db != nil){
            if let jobs =  db?.getActiveMarkedJobs(){
                var jobsAsDictionaryArray=[[String:Any]]()
                for job in jobs{
                    jobsAsDictionaryArray.append(job.toDictionary())
                }
                resolve(jobsAsDictionaryArray)
            }else{
                resolve([[String:Any]]())
            }
            
        }
    }

    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
