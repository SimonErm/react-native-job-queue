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

## Getting started (RN<0.60)

`$ npm install react-native-job-queue@git+https://git@github.com/SimonErm/react-native-job-queue.git --save`

### Mostly automatic installation

`$ react-native link react-native-job-queue`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-job-queue` and add `JobQueue.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libJobQueue.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.github.simonerm.JobQueuePackage;` to the imports at the top of the file
  - Add `new JobQueuePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-job-queue'
  	project(':react-native-job-queue').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-job-queue/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-job-queue')
  	```