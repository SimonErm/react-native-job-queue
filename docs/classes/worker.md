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

* [execute](worker.md#execute)

## Constructors

###  constructor

\+ **new Worker**(`name`: string, `executer`: function, `options`: [WorkerOptions](../interfaces/workeroptions.md)‹*`P`*›): *[Worker](worker.md)*

*Defined in [Worker.ts:23](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/Worker.ts#L23)*

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

*Defined in [Worker.ts:15](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/Worker.ts#L15)*

___

###  name

• **name**: *string*

*Defined in [Worker.ts:14](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/Worker.ts#L14)*

## Accessors

###  availableExecuters

• **get availableExecuters**(): *number*

*Defined in [Worker.ts:62](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/Worker.ts#L62)*

**Returns:** *number*

amount of available Executers for current worker

___

###  isBusy

• **get isBusy**(): *boolean*

*Defined in [Worker.ts:56](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/Worker.ts#L56)*

**Returns:** *boolean*

true if worker runs max concurrent amout of jobs

## Methods

###  execute

▸ **execute**(`rawJob`: [RawJob](../interfaces/rawjob.md)): *`Promise<void>`*

*Defined in [Worker.ts:69](https://github.com/SimonErm/react-native-job-queue/blob/acf0a20/src/Worker.ts#L69)*

This method should not be invoked manually and is used by the queue to execute jobs

**Parameters:**

Name | Type |
------ | ------ |
`rawJob` | [RawJob](../interfaces/rawjob.md) |

**Returns:** *`Promise<void>`*