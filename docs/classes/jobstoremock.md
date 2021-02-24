---
id: jobstoremock
title: JobStoreMock
sidebar_label: JobStoreMock
---

[JobStoreMock](jobstoremock.md) /

## Hierarchy

* **JobStoreMock**

## Implements

* [JobStore](../interfaces/jobstore.md)

## Index

### Constructors

* [constructor](jobstoremock.md#constructor)

### Properties

* [jobs](jobstoremock.md#jobs)

### Methods

* [addJob](jobstoremock.md#addjob)
* [deleteAllJobs](jobstoremock.md#deletealljobs)
* [getActiveMarkedJobs](jobstoremock.md#getactivemarkedjobs)
* [getJobs](jobstoremock.md#getjobs)
* [getJobsForWorker](jobstoremock.md#getjobsforworker)
* [getNextJob](jobstoremock.md#getnextjob)
* [removeJob](jobstoremock.md#removejob)
* [removeJobsByWorkerName](jobstoremock.md#removejobsbyworkername)
* [updateJob](jobstoremock.md#updatejob)

## Constructors

###  constructor

\+ **new JobStoreMock**(): *[JobStoreMock](jobstoremock.md)*

*Defined in [utils/JobQueueMock.ts:5](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/utils/JobQueueMock.ts#L5)*

**Returns:** *[JobStoreMock](jobstoremock.md)*

## Properties

###  jobs

• **jobs**: *[RawJob](../interfaces/rawjob.md)[]* =  []

*Defined in [utils/JobQueueMock.ts:5](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/utils/JobQueueMock.ts#L5)*

## Methods

###  addJob

▸ **addJob**(`job`: [RawJob](../interfaces/rawjob.md)): *`Promise<void>`*

*Implementation of [JobStore](../interfaces/jobstore.md)*

*Defined in [utils/JobQueueMock.ts:8](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/utils/JobQueueMock.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [RawJob](../interfaces/rawjob.md) |

**Returns:** *`Promise<void>`*

___

###  deleteAllJobs

▸ **deleteAllJobs**(): *`Promise<void>`*

*Implementation of [JobStore](../interfaces/jobstore.md)*

*Defined in [utils/JobQueueMock.ts:44](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/utils/JobQueueMock.ts#L44)*

**Returns:** *`Promise<void>`*

___

###  getActiveMarkedJobs

▸ **getActiveMarkedJobs**(): *`Promise<RawJob[]>`*

*Implementation of [JobStore](../interfaces/jobstore.md)*

*Defined in [utils/JobQueueMock.ts:15](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/utils/JobQueueMock.ts#L15)*

**Returns:** *`Promise<RawJob[]>`*

___

###  getJobs

▸ **getJobs**(): *`Promise<RawJob[]>`*

*Implementation of [JobStore](../interfaces/jobstore.md)*

*Defined in [utils/JobQueueMock.ts:12](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/utils/JobQueueMock.ts#L12)*

**Returns:** *`Promise<RawJob[]>`*

___

###  getJobsForWorker

▸ **getJobsForWorker**(`name`: string, `count`: number): *`Promise<RawJob[]>`*

*Implementation of [JobStore](../interfaces/jobstore.md)*

*Defined in [utils/JobQueueMock.ts:25](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/utils/JobQueueMock.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`count` | number |

**Returns:** *`Promise<RawJob[]>`*

___

###  getNextJob

▸ **getNextJob**(): *`Promise<RawJob>`*

*Implementation of [JobStore](../interfaces/jobstore.md)*

*Defined in [utils/JobQueueMock.ts:19](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/utils/JobQueueMock.ts#L19)*

**Returns:** *`Promise<RawJob>`*

___

###  removeJob

▸ **removeJob**(`rawJob`: [RawJob](../interfaces/rawjob.md)): *void*

*Implementation of [JobStore](../interfaces/jobstore.md)*

*Defined in [utils/JobQueueMock.ts:38](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/utils/JobQueueMock.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`rawJob` | [RawJob](../interfaces/rawjob.md) |

**Returns:** *void*

___

###  removeJobsByWorkerName

▸ **removeJobsByWorkerName**(`workerName`: string): *void*

*Implementation of [JobStore](../interfaces/jobstore.md)*

*Defined in [utils/JobQueueMock.ts:41](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/utils/JobQueueMock.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`workerName` | string |

**Returns:** *void*

___

###  updateJob

▸ **updateJob**(`rawJob`: [RawJob](../interfaces/rawjob.md)): *void*

*Implementation of [JobStore](../interfaces/jobstore.md)*

*Defined in [utils/JobQueueMock.ts:30](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/utils/JobQueueMock.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`rawJob` | [RawJob](../interfaces/rawjob.md) |

**Returns:** *void*