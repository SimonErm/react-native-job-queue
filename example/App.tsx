import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import queue from '../src/Queue';
import { Worker } from '../src/Worker';

export interface IAppProps {}

export interface IAppState {
    counter: number;
}

export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            counter: 0,
        };
    }
    componentDidMount() {
        queue.configure({
            onQueueFinish: (executed) => {
                console.log('FinishedQueue');
            }
        });
        queue.addWorker(
            new Worker('testWorker', async (payload) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.setState({
                            counter: payload.id
                        })
                        resolve();
                    }, 5000);
                });
            })
        );
    }

    public render() {
        const { counter } = this.state;
        return (
            <View style={styles.container}>
                <Button
                    title='add Job'
                    onPress={() => {
                        queue.addJob('testWorker', { id: counter + 1 }, undefined, false);
                    }}
                />
                <View style={styles.spacing}>
                    <Button
                        title='start Queue'
                        onPress={() => {
                            queue.start();
                        }}
                    />
                </View>
                <View style={styles.spacing}>
                    <Text>Counter: {counter}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    spacing: {
        marginTop: 20,
    }
});
