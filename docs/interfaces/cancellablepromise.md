---
id: cancellablepromise
title: CancellablePromise
sidebar_label: CancellablePromise
---

[CancellablePromise](cancellablepromise.md) /

## Type parameters

▪ **T**

## Hierarchy

* `Promise<T>`

  * **CancellablePromise**

## Index

### Properties

* [Promise](cancellablepromise.md#promise)
* [__@toStringTag](cancellablepromise.md#__@tostringtag)
* [rn_job_queue_cancel](cancellablepromise.md#optional-rn_job_queue_cancel)

### Methods

* [catch](cancellablepromise.md#catch)
* [then](cancellablepromise.md#then)

## Properties

###  Promise

• **Promise**: *`PromiseConstructor`*

Defined in /Users/simon/Developer/Projects/ReactNative/react-native-job-queue/node_modules/typescript/lib/lib.es2015.promise.d.ts:152

___

###  __@toStringTag

• **__@toStringTag**: *string*

*Inherited from void*

Defined in /Users/simon/Developer/Projects/ReactNative/react-native-job-queue/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:169

___

### `Optional` rn_job_queue_cancel

• **rn_job_queue_cancel**? : *undefined | function*

*Defined in [Worker.ts:14](https://github.com/SimonErm/react-native-job-queue/blob/054fcbe/src/Worker.ts#L14)*

## Methods

###  catch

▸ **catch**<**TResult**>(`onrejected?`: function | undefined | null): *`Promise<T | TResult>`*

*Inherited from void*

Defined in /Users/simon/Developer/Projects/ReactNative/react-native-job-queue/node_modules/typescript/lib/lib.es5.d.ts:1413

Attaches a callback for only the rejection of the Promise.

**Type parameters:**

▪ **TResult**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`onrejected?` | function &#124; undefined &#124; null | The callback to execute when the Promise is rejected. |

**Returns:** *`Promise<T | TResult>`*

A Promise for the completion of the callback.

___

###  then

▸ **then**<**TResult1**, **TResult2**>(`onfulfilled?`: function | undefined | null, `onrejected?`: function | undefined | null): *`Promise<TResult1 | TResult2>`*

*Inherited from void*

Defined in /Users/simon/Developer/Projects/ReactNative/react-native-job-queue/node_modules/typescript/lib/lib.es5.d.ts:1406

Attaches callbacks for the resolution and/or rejection of the Promise.

**Type parameters:**

▪ **TResult1**

▪ **TResult2**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`onfulfilled?` | function &#124; undefined &#124; null | The callback to execute when the Promise is resolved. |
`onrejected?` | function &#124; undefined &#124; null | The callback to execute when the Promise is rejected. |

**Returns:** *`Promise<TResult1 | TResult2>`*

A Promise for the completion of which ever callback is executed.