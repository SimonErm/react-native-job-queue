import { NativeModules } from 'react-native';

import { JobStoreMock } from './src/utils/JobQueueMock';

NativeModules.JobQueue = new JobStoreMock();
