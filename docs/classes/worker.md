---
id: worker
title: Worker
sidebar_label: Worker
---

[Worker](worker.md) /

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

\+ **new Worker**(`name`: string, `executer`: function, `options`: [WorkerOptions](../interfaces/workeroptions.md)): *[Worker](worker.md)*

*Defined in [Worker.ts:20](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Worker.ts#L20)*

**Parameters:**

▪ **name**: *string*

▪ **executer**: *function*

▸ (`payload`: any): *`Promise<any>`*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | any |

▪`Default value`  **options**: *[WorkerOptions](../interfaces/workeroptions.md)*=  {}

**Returns:** *[Worker](worker.md)*

## Properties

###  concurrency

• **concurrency**: *number*

*Defined in [Worker.ts:12](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Worker.ts#L12)*

___

###  name

• **name**: *string*

*Defined in [Worker.ts:11](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Worker.ts#L11)*

## Accessors

###  availableExecuters

• **get availableExecuters**(): *number*

*Defined in [Worker.ts:52](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Worker.ts#L52)*

**Returns:** *number*

amount of available Executers for current worker

___

###  isBusy

• **get isBusy**(): *boolean*

*Defined in [Worker.ts:46](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Worker.ts#L46)*

**Returns:** *boolean*

true if worker runs max concurrent amout of jobs

## Methods

###  execute

▸ **execute**(`job`: [Job](../interfaces/job.md)): *`Promise<void>`*

*Defined in [Worker.ts:59](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Worker.ts#L59)*

This method should not be invoked manually and is used by the queue to execute jobs

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`job` | [Job](../interfaces/job.md) | to be executed  |

**Returns:** *`Promise<void>`*