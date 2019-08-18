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
* [executeWithTimeout](worker.md#executewithtimeout)

## Constructors

###  constructor

\+ **new Worker**(`name`: string, `runner`: function, `options`: [WorkerOptions](../interfaces/workeroptions.md)): *[Worker](worker.md)*

*Defined in [Worker.ts:20](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Worker.ts#L20)*

**Parameters:**

▪ **name**: *string*

▪ **runner**: *function*

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

*Defined in [Worker.ts:12](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Worker.ts#L12)*

___

###  name

• **name**: *string*

*Defined in [Worker.ts:11](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Worker.ts#L11)*

## Accessors

###  availableExecuters

• **get availableExecuters**(): *number*

*Defined in [Worker.ts:46](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Worker.ts#L46)*

**Returns:** *number*

___

###  isBusy

• **get isBusy**(): *boolean*

*Defined in [Worker.ts:43](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Worker.ts#L43)*

**Returns:** *boolean*

## Methods

###  execute

▸ **execute**(`job`: [Job](../interfaces/job.md)): *`Promise<void>`*

*Defined in [Worker.ts:49](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Worker.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [Job](../interfaces/job.md) |

**Returns:** *`Promise<void>`*

___

###  executeWithTimeout

▸ **executeWithTimeout**(`job`: [Job](../interfaces/job.md), `timeout`: number): *`Promise<void>`*

*Defined in [Worker.ts:69](https://github.com/SimonErm/react-native-job-queue/blob/ff11380/src/Worker.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`job` | [Job](../interfaces/job.md) |
`timeout` | number |

**Returns:** *`Promise<void>`*