---
id: index
title: react-native-job-queue
sidebar_label: Globals
---

## Index

### Classes

* [JobStoreMock](classes/jobstoremock.md)
* [Queue](classes/queue.md)
* [Uuid](classes/uuid.md)
* [Worker](classes/worker.md)

### Interfaces

* [CancellablePromise](interfaces/cancellablepromise.md)
* [Job](interfaces/job.md)
* [JobStore](interfaces/jobstore.md)
* [QueueOptions](interfaces/queueoptions.md)
* [RawJob](interfaces/rawjob.md)
* [WorkerOptions](interfaces/workeroptions.md)

### Type aliases

* [Bool](index.md#bool)
* [FALSE](index.md#false)
* [TRUE](index.md#true)

### Variables

* [CANCEL](index.md#const-cancel)
* [FALSE](index.md#const-false)
* [TRUE](index.md#const-true)

## Type aliases

###  Bool

Ƭ **Bool**: *[TRUE](index.md#true) | [FALSE](index.md#false)*

*Defined in [models/Job.ts:35](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/Job.ts#L35)*

used to map booleans to integer since Sqlite doesn't support boolean

___

###  FALSE

Ƭ **FALSE**: *`0`*

*Defined in [models/Job.ts:36](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/Job.ts#L36)*

___

###  TRUE

Ƭ **TRUE**: *`1`*

*Defined in [models/Job.ts:37](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/Job.ts#L37)*

## Variables

### `Const` CANCEL

• **CANCEL**: *"rn_job_queue_cancel"* = "rn_job_queue_cancel"

*Defined in [Worker.ts:3](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Worker.ts#L3)*

___

### `Const` FALSE

• **FALSE**: *`0`* = 0

*Defined in [models/Job.ts:38](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/Job.ts#L38)*

___

### `Const` TRUE

• **TRUE**: *`1`* = 1

*Defined in [models/Job.ts:39](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/models/Job.ts#L39)*