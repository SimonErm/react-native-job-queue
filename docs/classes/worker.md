---
id: worker
title: Worker
sidebar_label: Worker
---

[Worker](worker.md) /

## Type parameters

▪ **P**: *object*

specifies the Type of the Job-Payload.

## Hierarchy

* **Worker**

## Index

### Constructors

* [constructor](worker.md#constructor)

### Properties

* [concurrency](worker.md#concurrency)
* [name](worker.md#name)

### Accessors

* [availableExecuters](worker.md#availableexecuters)
* [isBusy](worker.md#isbusy)

### Methods

* [decreaseExecutionCount](worker.md#decreaseexecutioncount)
* [execute](worker.md#execute)
* [triggerCompletion](worker.md#triggercompletion)
* [triggerFailure](worker.md#triggerfailure)
* [triggerSuccess](worker.md#triggersuccess)

## Constructors

###  constructor

\+ **new Worker**(`name`: string, `executer`: function, `options`: [WorkerOptions](../interfaces/workeroptions.md)‹*`P`*›): *[Worker](worker.md)*

*Defined in [Worker.ts:29](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Worker.ts#L29)*

**`typeparam`** specifies the type of the job-payload.

**Parameters:**

▪ **name**: *string*

of worker

▪ **executer**: *function*

function to run jobs

▸ (`payload`: `P`): *`Promise<any>`*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | `P` |

▪`Default value`  **options**: *[WorkerOptions](../interfaces/workeroptions.md)‹*`P`*›*=  {}

to configure worker

**Returns:** *[Worker](worker.md)*

## Properties

###  concurrency

• **concurrency**: *number*

*Defined in [Worker.ts:21](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Worker.ts#L21)*

___

###  name

• **name**: *string*

*Defined in [Worker.ts:20](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Worker.ts#L20)*

## Accessors

###  availableExecuters

• **get availableExecuters**(): *number*

*Defined in [Worker.ts:68](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Worker.ts#L68)*

**Returns:** *number*

amount of available Executers for current worker

___

###  isBusy

• **get isBusy**(): *boolean*

*Defined in [Worker.ts:62](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Worker.ts#L62)*

**Returns:** *boolean*

true if worker runs max concurrent amout of jobs

## Methods

###  decreaseExecutionCount

▸ **decreaseExecutionCount**(): *void*

*Defined in [Worker.ts:123](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Worker.ts#L123)*

**Returns:** *void*

___

###  execute

▸ **execute**(`rawJob`: [RawJob](../interfaces/rawjob.md)): *[CancellablePromise](../interfaces/cancellablepromise.md)‹*any*›*

*Defined in [Worker.ts:75](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Worker.ts#L75)*

This method should not be invoked manually and is used by the queue to execute jobs

**Parameters:**

Name | Type |
------ | ------ |
`rawJob` | [RawJob](../interfaces/rawjob.md) |

**Returns:** *[CancellablePromise](../interfaces/cancellablepromise.md)‹*any*›*

___

###  triggerCompletion

▸ **triggerCompletion**(`job`: [Job](../interfaces/job.md)‹*`P`*›): *void*

*Defined in [Worker.ts:120](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Worker.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [Job](../interfaces/job.md)‹*`P`*› |

**Returns:** *void*

___

###  triggerFailure

▸ **triggerFailure**(`job`: [Job](../interfaces/job.md)‹*`P`*›, `error`: `Error`): *void*

*Defined in [Worker.ts:117](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Worker.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [Job](../interfaces/job.md)‹*`P`*› |
`error` | `Error` |

**Returns:** *void*

___

###  triggerSuccess

▸ **triggerSuccess**(`job`: [Job](../interfaces/job.md)‹*`P`*›): *void*

*Defined in [Worker.ts:114](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Worker.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [Job](../interfaces/job.md)‹*`P`*› |

**Returns:** *void*