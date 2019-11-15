---
id: queue
title: Queue
sidebar_label: Queue
---

[Queue](queue.md) /

## Usage

```typescript
import queue from 'react-native-job-queue'

queue.configure({onQueueFinish:(executedJobs:Job[])=>{
     console.log("Queue stopped and executed",executedJobs)
}});
queue.addWorker(new Worker("testWorker",async(payload)=>{
     return new Promise((resolve) => {
     setTimeout(() => {
         console.log(payload.text);
         resolve();
     }, payload.delay);});
}))
queue.addJob("testWorker",{text:"Job example palyoad content text",delay:5000})
```

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

*Defined in [Queue.ts:79](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Queue.ts#L79)*

**Returns:** *boolean*

true if the Queue is running and false otherwise

___

###  registeredWorkers

• **get registeredWorkers**(): *object*

*Defined in [Queue.ts:85](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Queue.ts#L85)*

**Returns:** *object*

the workers map (readonly)

* \[ **key**: *string*\]: [Worker](worker.md)

___

### `Static` instance

• **get instance**(): *[Queue](queue.md)*

*Defined in [Queue.ts:68](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Queue.ts#L68)*

**Returns:** *[Queue](queue.md)*

## Methods

###  addJob

▸ **addJob**(`workerName`: string, `payload`: any, `options`: object, `startQueue`: boolean): *void*

*Defined in [Queue.ts:131](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Queue.ts#L131)*

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

*Defined in [Queue.ts:104](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Queue.ts#L104)*

adds a [Worker](worker.md) to the queue which can execute Jobs

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`worker` | [Worker](worker.md) |   |

**Returns:** *void*

___

###  configure

▸ **configure**(`options`: [QueueOptions](../interfaces/queueoptions.md)): *void*

*Defined in [Queue.ts:95](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Queue.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [QueueOptions](../interfaces/queueoptions.md) |

**Returns:** *void*

___

###  getJobs

▸ **getJobs**(): *`Promise<Job[]>`*

*Defined in [Queue.ts:91](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Queue.ts#L91)*

**Returns:** *`Promise<Job[]>`*

a promise that resolves all jobs that are queued and not active

___

###  removeWorker

▸ **removeWorker**(`name`: string, `deleteRelatedJobs`: boolean): *void*

*Defined in [Queue.ts:117](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Queue.ts#L117)*

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

*Defined in [Queue.ts:163](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Queue.ts#L163)*

starts the queue to execute queued jobs

**Returns:** *void*

___

###  stop

▸ **stop**(): *void*

*Defined in [Queue.ts:174](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Queue.ts#L174)*

stop the queue from executing queued jobs

**Returns:** *void*