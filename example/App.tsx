import * as React from 'react';
import { Button, View } from 'react-native';

import queue from '../src/Queue';
import { Worker } from '../src/Worker';

export interface IAppProps {}

export interface IAppState {}
let counter = 0;
export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        queue.addWorker(
            new Worker('testWorker', async (payload) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        console.log(payload);
                        resolve();
                    }, 50000);
                });
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
                    title='start Queue'
                    onPress={() => {
                        queue.start();
                    }}
                />
            </View>
        );
    }
}
