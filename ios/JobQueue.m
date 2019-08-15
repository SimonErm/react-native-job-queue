#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(JobQueue, NSObject)

RCT_EXTERN_METHOD(addJob:(NSDictionary *)job)
RCT_EXTERN_METHOD(removeJob:(NSDictionary *)job)
RCT_EXTERN_METHOD(getNextJob:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getJobsForWorker:(NSString *)name count:(NSInteger) count resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end
