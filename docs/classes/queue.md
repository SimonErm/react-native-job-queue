---
id: queue
title: Queue
sidebar_label: Queue
---

[Queue](queue.md) /

## Hierarchy

* **Queue**

## Index

### Accessors

* [isRunning](queue.md#isrunning)
* [registeredWorkers](queue.md#registeredworkers)
* [instance](queue.md#static-instance)

### Methods

* [addJob](queue.md#addjob)
* [addWorker](queue.md#addworker)
* [configure](queue.md#configure)
* [getJobs](queue.md#getjobs)
* [removeWorker](queue.md#removeworker)
* [start](queue.md#start)
* [stop](queue.md#stop)

## Accessors

###  isRunning

• **get isRunning**(): *boolean*

*Defined in [Queue.ts:50](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Queue.ts#L50)*

**Returns:** *boolean*

true if the Queue is running and false otherwise

___

###  registeredWorkers

• **get registeredWorkers**(): *object*

*Defined in [Queue.ts:56](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Queue.ts#L56)*

**Returns:** *object*

the workers map (readonly)

* \[ **key**: *string*\]: [Worker](worker.md)

___

### `Static` instance

• **get instance**(): *[Queue](queue.md)*

*Defined in [Queue.ts:39](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Queue.ts#L39)*

**Returns:** *[Queue](queue.md)*

## Methods

###  addJob

▸ **addJob**(`workerName`: string, `payload`: any, `options`: object, `startQueue`: boolean): *void*

*Defined in [Queue.ts:102](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Queue.ts#L102)*

adds a job to the queue

**Parameters:**

▪ **workerName**: *string*

name of the worker which should be used to excute the job

▪`Default value`  **payload**: *any*=  {}

which is passed as parameter to the executer

▪`Default value`  **options**: *object*=  { attempts: 0, timeout: 0, priority: 0 }

to set max attempts, a timeout and a priority

Name | Type | Default |
------ | ------ | ------ |
`attempts` | number | 0 |
`priority` | number | 0 |
`timeout` | number | 0 |

▪`Default value`  **startQueue**: *boolean*= true

**Returns:** *void*

___

###  addWorker

▸ **addWorker**(`worker`: [Worker](worker.md)): *void*

*Defined in [Queue.ts:78](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Queue.ts#L78)*

```typescript
queue.addWorker(new Worker("test"))
```
adds a [Worker](worker.md) to the queue which can execute Jobs

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`worker` | [Worker](worker.md) |   |

**Returns:** *void*

___

###  configure

▸ **configure**(`options`: [QueueOptions](../interfaces/queueoptions.md)): *void*

*Defined in [Queue.ts:66](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Queue.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [QueueOptions](../interfaces/queueoptions.md) |

**Returns:** *void*

___

###  getJobs

▸ **getJobs**(): *`Promise<Job[]>`*

*Defined in [Queue.ts:62](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Queue.ts#L62)*

**Returns:** *`Promise<Job[]>`*

a promise that resolves all jobs that are queued and not active

___

###  removeWorker

▸ **removeWorker**(`name`: string, `deleteRelatedJobs`: boolean): *void*

*Defined in [Queue.ts:91](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Queue.ts#L91)*

removes worker from queue

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`name` | string | - |
`deleteRelatedJobs` | boolean | false |

**Returns:** *void*

___

###  start

▸ **start**(): *void*

*Defined in [Queue.ts:134](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Queue.ts#L134)*

starts the queue to execute queued jobs

**Returns:** *void*

___

###  stop

▸ **stop**(): *void*

*Defined in [Queue.ts:145](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Queue.ts#L145)*

stop the queue from executing queued jobs

**Returns:** *void*