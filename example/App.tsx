import * as React from 'react';
import { Button, View } from 'react-native';

import queue from '../src/Queue';
import { Worker, CANCEL } from '../src/Worker';

export interface IAppProps {}

export interface IAppState {}
let counter = 0;
export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        queue.configure({
            onQueueFinish: (executed) => {
                console.log('FinishedQueue');
            }
        });
        queue.addWorker(
            new Worker('testWorker', async (payload) => {
              let cancel
                const promise = new Promise((resolve, reject) => {
                    const timeout = setTimeout(() => {
                        console.log(payload);
                        resolve();
                    }, 5000);

                    cancel = () => {
                      clearTimeout(timeout)
                      reject({message: 'canceled'})
                    }
                });

                promise[CANCEL] = cancel
                return promise
            })
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
                        // get first running job id
                        const runningPromiseKey = Object.keys(queue.runningJobPromises)[0]
                        queue.cancelJob(runningPromiseKey, {message: 'Canceled'})
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
