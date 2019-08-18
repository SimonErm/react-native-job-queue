---
id: jobstore
title: JobStore
sidebar_label: JobStore
---

[JobStore](jobstore.md) /

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
* [updateJob](jobstore.md#updatejob)

## Methods

###  addJob

▸ **addJob**(`job`: [Job](job.md)): *`Promise<void>`*

*Defined in [models/JobStore.ts:4](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/models/JobStore.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [Job](job.md) |

**Returns:** *`Promise<void>`*

___

###  deleteAllJobs

▸ **deleteAllJobs**(): *`Promise<void>`*

*Defined in [models/JobStore.ts:10](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/models/JobStore.ts#L10)*

**Returns:** *`Promise<void>`*

___

###  getJobs

▸ **getJobs**(): *`Promise<Job[]>`*

*Defined in [models/JobStore.ts:5](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/models/JobStore.ts#L5)*

**Returns:** *`Promise<Job[]>`*

___

###  getJobsForWorker

▸ **getJobsForWorker**(`name`: string, `count`: number): *`Promise<Job[]>`*

*Defined in [models/JobStore.ts:7](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/models/JobStore.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`count` | number |

**Returns:** *`Promise<Job[]>`*

___

###  getNextJob

▸ **getNextJob**(): *`Promise<Job>`*

*Defined in [models/JobStore.ts:6](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/models/JobStore.ts#L6)*

**Returns:** *`Promise<Job>`*

___

###  removeJob

▸ **removeJob**(`job`: [Job](job.md)): *void*

*Defined in [models/JobStore.ts:9](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/models/JobStore.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [Job](job.md) |

**Returns:** *void*

___

###  updateJob

▸ **updateJob**(`job`: [Job](job.md)): *void*

*Defined in [models/JobStore.ts:8](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/models/JobStore.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [Job](job.md) |

**Returns:** *void*