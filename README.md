# react-native-job-queue

This library is inspired by [react-native-queue](https://github.com/billmalarky/react-native-queue) which seems to be unmaintained.
Instead of using realm, this library provides an own sqlite based native implementation.

Since react-native struggles with using `use_frameworks!` in pod files i wasn't able to use https://github.com/stephencelis/SQLite.swift and had to implement the native ios part guided by https://www.raywenderlich.com/385-sqlite-with-swift-tutorial-getting-started . If react-native starts to support `use_frameworks!` or you are able to make it work, feel free to do a PR.
On Android i used Androids Room-Persitence-Library.

You can find API-Reference [here](https://simonerm.github.io/react-native-job-queue/docs/)

## Getting started (RN>=0.60)

`$ npm install react-native-job-queue@git+https://git@github.com/SimonErm/react-native-job-queue.git --save`

### Install Pods

`$ cd ios && pod install`
