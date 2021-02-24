---
id: queueoptions
title: QueueOptions
sidebar_label: QueueOptions
---

[QueueOptions](queueoptions.md) /

Options to configure the queue

## Hierarchy

* **QueueOptions**

## Index

### Properties

* [concurrency](queueoptions.md#optional-concurrency)
* [onQueueFinish](queueoptions.md#optional-onqueuefinish)
* [updateInterval](queueoptions.md#optional-updateinterval)

## Properties

### `Optional` concurrency

• **concurrency**? : *undefined | number*

*Defined in [Queue.ts:21](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L21)*

___

### `Optional` onQueueFinish

• **onQueueFinish**? : *undefined | function*

*Defined in [Queue.ts:16](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L16)*

A callback function which is called after the queue has been stopped

**`parameter`** executedJobs

___

### `Optional` updateInterval

• **updateInterval**? : *undefined | number*

*Defined in [Queue.ts:20](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Queue.ts#L20)*

Interval in which the queue checks for new jobs to execute