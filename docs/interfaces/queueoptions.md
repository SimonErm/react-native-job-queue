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

* [onQueueFinish](queueoptions.md#optional-onqueuefinish)
* [updateInterval](queueoptions.md#optional-updateinterval)

## Properties

### `Optional` onQueueFinish

• **onQueueFinish**? : *undefined | function*

*Defined in [Queue.ts:16](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Queue.ts#L16)*

A callback function which is called after the queue has been stopped

**`parameter`** executedJobs

___

### `Optional` updateInterval

• **updateInterval**? : *undefined | number*

*Defined in [Queue.ts:20](https://github.com/SimonErm/react-native-job-queue/blob/ee4ec3d/src/Queue.ts#L20)*

Interval in which the queue checks for new jobs to execute