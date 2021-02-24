---
id: jobstore
title: JobStore
sidebar_label: JobStore
---

[JobStore](jobstore.md) /

maps typescript to native functions

## Hierarchy

* **JobStore**

## Implemented by

* [JobStoreMock](../classes/jobstoremock.md)

## Index

### Methods

* [addJob](jobstore.md#addjob)
* [deleteAllJobs](jobstore.md#deletealljobs)
* [getActiveMarkedJobs](jobstore.md#getactivemarkedjobs)
* [getJobs](jobstore.md#getjobs)
* [getJobsForWorker](jobstore.md#getjobsforworker)
* [getNextJob](jobstore.md#getnextjob)
* [removeJob](jobstore.md#removejob)
* [removeJobsByWorkerName](jobstore.md#removejobsbyworkername)
* [updateJob](jobstore.md#updatejob)

## Methods

###  addJob

▸ **addJob**(`job`: [RawJob](rawjob.md)): *`Promise<void>`*

*Defined in [models/JobStore.ts:7](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/JobStore.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [RawJob](rawjob.md) |

**Returns:** *`Promise<void>`*

___

###  deleteAllJobs

▸ **deleteAllJobs**(): *`Promise<void>`*

*Defined in [models/JobStore.ts:15](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/JobStore.ts#L15)*

**Returns:** *`Promise<void>`*

___

###  getActiveMarkedJobs

▸ **getActiveMarkedJobs**(): *`Promise<RawJob[]>`*

*Defined in [models/JobStore.ts:9](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/JobStore.ts#L9)*

**Returns:** *`Promise<RawJob[]>`*

___

###  getJobs

▸ **getJobs**(): *`Promise<RawJob[]>`*

*Defined in [models/JobStore.ts:8](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/JobStore.ts#L8)*

**Returns:** *`Promise<RawJob[]>`*

___

###  getJobsForWorker

▸ **getJobsForWorker**(`name`: string, `count`: number): *`Promise<RawJob[]>`*

*Defined in [models/JobStore.ts:11](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/JobStore.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`count` | number |

**Returns:** *`Promise<RawJob[]>`*

___

###  getNextJob

▸ **getNextJob**(): *`Promise<RawJob>`*

*Defined in [models/JobStore.ts:10](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/JobStore.ts#L10)*

**Returns:** *`Promise<RawJob>`*

___

###  removeJob

▸ **removeJob**(`job`: [RawJob](rawjob.md)): *void*

*Defined in [models/JobStore.ts:13](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/JobStore.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [RawJob](rawjob.md) |

**Returns:** *void*

___

###  removeJobsByWorkerName

▸ **removeJobsByWorkerName**(`workerName`: string): *void*

*Defined in [models/JobStore.ts:14](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/JobStore.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`workerName` | string |

**Returns:** *void*

___

###  updateJob

▸ **updateJob**(`job`: [RawJob](rawjob.md)): *void*

*Defined in [models/JobStore.ts:12](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/JobStore.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [RawJob](rawjob.md) |

**Returns:** *void*