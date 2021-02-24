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
* [cancelJob](queue.md#canceljob)
* [configure](queue.md#configure)
* [getJobs](queue.md#getjobs)
* [removeWorker](queue.md#removeworker)
* [start](queue.md#start)
* [stop](queue.md#stop)

## Accessors

###  isRunning

• **get isRunning**(): *boolean*

*Defined in [Queue.ts:54](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L54)*

**Returns:** *boolean*

true if the Queue is running and false otherwise

___

###  registeredWorkers

• **get registeredWorkers**(): *object*

*Defined in [Queue.ts:60](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L60)*

**Returns:** *object*

the workers map (readonly)

* \[ **key**: *string*\]: [Worker](worker.md)‹*any*›

___

### `Static` instance

• **get instance**(): *[Queue](queue.md)*

*Defined in [Queue.ts:43](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L43)*

**Returns:** *[Queue](queue.md)*

## Methods

###  addJob

▸ **addJob**<**P**>(`workerName`: string, `payload`: `P`, `options`: object, `startQueue`: boolean): *string*

*Defined in [Queue.ts:143](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L143)*

adds a job to the queue

**Type parameters:**

▪ **P**: *object*

**Parameters:**

▪ **workerName**: *string*

name of the worker which should be used to excute the job

▪ **payload**: *`P`*

which is passed as parameter to the executer

▪`Default value`  **options**: *object*=  { attempts: 0, timeout: 0, priority: 0 }

to set max attempts, a timeout and a priority

Name | Type | Default |
------ | ------ | ------ |
`attempts` | number | 0 |
`priority` | number | 0 |
`timeout` | number | 0 |

▪`Default value`  **startQueue**: *boolean*= true

**Returns:** *string*

job id

___

###  addWorker

▸ **addWorker**(`worker`: [Worker](worker.md)‹*any*›): *void*

*Defined in [Queue.ts:115](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L115)*

adds a [Worker](worker.md) to the queue which can execute Jobs

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`worker` | [Worker](worker.md)‹*any*› |   |

**Returns:** *void*

___

###  cancelJob

▸ **cancelJob**(`jobId`: string, `exception?`: `Error`): *void*

*Defined in [Queue.ts:195](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L195)*

cancel running job

**Parameters:**

Name | Type |
------ | ------ |
`jobId` | string |
`exception?` | `Error` |

**Returns:** *void*

___

###  configure

▸ **configure**(`options`: [QueueOptions](../interfaces/queueoptions.md)): *void*

*Defined in [Queue.ts:101](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L101)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [QueueOptions](../interfaces/queueoptions.md) |

**Returns:** *void*

___

###  getJobs

▸ **getJobs**(): *`Promise<RawJob[]>`*

*Defined in [Queue.ts:97](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L97)*

**Returns:** *`Promise<RawJob[]>`*

a promise that resolves all jobs that are queued and not active

___

###  removeWorker

▸ **removeWorker**(`name`: string, `deleteRelatedJobs`: boolean): *void*

*Defined in [Queue.ts:128](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L128)*

removes worker from queue

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`name` | string | - |
`deleteRelatedJobs` | boolean | false |

**Returns:** *void*

___

###  start

▸ **start**(): *`Promise<void>`*

*Defined in [Queue.ts:177](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L177)*

starts the queue to execute queued jobs

**Returns:** *`Promise<void>`*

___

###  stop

▸ **stop**(): *void*

*Defined in [Queue.ts:188](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L188)*

stop the queue from executing queued jobs

**Returns:** *void*