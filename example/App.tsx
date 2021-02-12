import * as React from 'react';
import { Button, View } from 'react-native';

import queue from '../src/Queue';
import { Worker, CANCEL, CancellablePromise } from '../src/Worker';

export interface IAppProps {}

export interface IAppState {}
let counter = 0;
export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
          jobId: null,
        };
    }
    componentDidMount() {
        queue.configure({
            onQueueFinish: (executed) => {
                console.log('FinishedQueue');
            }
        });
        queue.addWorker(
            new Worker('testWorker', (payload) => {
              let cancel
                const promise: CancellablePromise<any> = new Promise((resolve, reject) => {
                    const timeout = setTimeout(() => {
                        console.log(payload);
                        resolve();
                    }, 5000);

                    cancel = () => {
                      clearTimeout(timeout)
                      reject(new Error('canceled'))
                    }
                });

                promise[CANCEL] = cancel
                return promise
            },{
              onStart: ({id}) => this.setState({jobId: id}),
              onCompletion: () => this.setState({jobId: null}),
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
                      if(this.state.jobId){
                        queue.cancelJob(this.state.jobId, {message: 'Canceled'})
                      } else {
                        console.log("no job running");
                      }
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
