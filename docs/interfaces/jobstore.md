---
id: jobstore
title: JobStore
sidebar_label: JobStore
---

[JobStore](jobstore.md) /

maps typescript to native functions

## Hierarchy

* **JobStore**

## Index

### Methods

* [addJob](jobstore.md#addjob)
* [deleteAllJobs](jobstore.md#deletealljobs)
* [getJobs](jobstore.md#getjobs)
* [getJobsForWorker](jobstore.md#getjobsforworker)
* [getNextJob](jobstore.md#getnextjob)
* [removeJob](jobstore.md#removejob)
* [removeJobsByWorkerName](jobstore.md#removejobsbyworkername)
* [updateJob](jobstore.md#updatejob)

## Methods

###  addJob

▸ **addJob**(`job`: [RawJob](rawjob.md)): *`Promise<void>`*

*Defined in [models/JobStore.ts:7](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/models/JobStore.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [RawJob](rawjob.md) |

**Returns:** *`Promise<void>`*

___

###  deleteAllJobs

▸ **deleteAllJobs**(): *`Promise<void>`*

*Defined in [models/JobStore.ts:14](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/models/JobStore.ts#L14)*

**Returns:** *`Promise<void>`*

___

###  getJobs

▸ **getJobs**(): *`Promise<RawJob[]>`*

*Defined in [models/JobStore.ts:8](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/models/JobStore.ts#L8)*

**Returns:** *`Promise<RawJob[]>`*

___

###  getJobsForWorker

▸ **getJobsForWorker**(`name`: string, `count`: number): *`Promise<RawJob[]>`*

*Defined in [models/JobStore.ts:10](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/models/JobStore.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`count` | number |

**Returns:** *`Promise<RawJob[]>`*

___

###  getNextJob

▸ **getNextJob**(): *`Promise<RawJob>`*

*Defined in [models/JobStore.ts:9](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/models/JobStore.ts#L9)*

**Returns:** *`Promise<RawJob>`*

___

###  removeJob

▸ **removeJob**(`job`: [RawJob](rawjob.md)): *void*

*Defined in [models/JobStore.ts:12](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/models/JobStore.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [RawJob](rawjob.md) |

**Returns:** *void*

___

###  removeJobsByWorkerName

▸ **removeJobsByWorkerName**(`workerName`: string): *void*

*Defined in [models/JobStore.ts:13](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/models/JobStore.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`workerName` | string |

**Returns:** *void*

___

###  updateJob

▸ **updateJob**(`job`: [RawJob](rawjob.md)): *void*

*Defined in [models/JobStore.ts:11](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/models/JobStore.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [RawJob](rawjob.md) |

**Returns:** *void*