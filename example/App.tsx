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
                setTimeout(() => console.log(payload), 10000);
            })
        );
    }
    public render() {
        return (
            <View>
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
