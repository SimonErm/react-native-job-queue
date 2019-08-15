import queue from '../Queue';
import { Worker } from '../Worker';

describe('Queue Basics', () => {
    it('add Workers', () => {
        queue.addWorker(new Worker('testWorker', async (payload: any) => {}));
        const workers = queue.registeredWorkers;
        const workerNames = Object.keys(workers);
        expect(workerNames.length).toEqual(1);
        expect(workerNames[0]).toEqual('testWorker');
    });
    it('run queue', (done) => {
        const executer = async (payload: any) => {
            done();
        };
        queue.addWorker(new Worker('testWorker', executer));
        queue.start();
    });
});
