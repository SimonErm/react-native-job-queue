import * as React from 'react';
import { Button, View } from 'react-native';

import queue from 'react-native-job-queue';
import { Worker, CANCEL, CancellablePromise } from 'react-native-job-queue';

export interface IAppProps {}

export interface IAppState {
    jobId?: string | null;
}
let counter = 0;
export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            jobId: null
        };
    }
    componentDidMount() {
        queue.configure({
            onQueueFinish: (executed) => {
                console.log('FinishedQueue');
            }
        });
        queue.addWorker(
            new Worker(
                'testWorker',
                (payload) => {
                    let cancel;
                    const promise: CancellablePromise<any> = new Promise((resolve, reject) => {
                        const timeout = setTimeout(() => {
                            console.log(payload);
                            resolve(true);
                        }, 5000);

                        cancel = () => {
                            clearTimeout(timeout);
                            reject(new Error('canceled'));
                        };
                    });

                    promise[CANCEL] = cancel;
                    return promise;
                },
                {
                    onStart: ({ id }) => this.setState({ jobId: id }),
                    onCompletion: () => this.setState({ jobId: null })
                }
            )
        );
    }
    public render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title='add Job'
                    onPress={() => {
                        queue.addJob('testWorker', { id: counter++ }, undefined, false);
                    }}
                />
                <Button
                    title='cancel Job'
                    onPress={() => {
                        if (this.state.jobId) {
                            queue.cancelJob(this.state.jobId, new Error('Canceled'));
                        } else {
                            console.log('no job running');
                        }
                    }}
                />
                <Button
                    title='remove failed Jobs'
                    onPress={async () => {
                        let jobs = await queue.getJobs();
                        let jobRemovals = jobs
                            .filter((job) => job.failed !== '')
                            .map(async (job) => await queue.removeJob(job));
                        await Promise.all(jobRemovals);
                    }}
                />
                <Button
                    title='requeue failed Jobs'
                    onPress={async () => {
                        let jobs = await queue.getJobs();
                        let jobRequeues = jobs
                            .filter((job) => job.failed !== '')
                            .map(async (job) => await queue.requeueJob(job));
                        await Promise.all(jobRequeues);
                    }}
                />
                <Button
                    title='getJobs'
                    onPress={async () => {
                        let jobs = await queue.getJobs();
                        console.log(jobs);
                    }}
                />
                <Button
                    title='start Queue'
                    onPress={() => {
                        queue.start();
                    }}
                />
            </View>
        );
    }
}
