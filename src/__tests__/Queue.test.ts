import queue from '../Queue';
import { Worker } from '../Worker';

export interface Payload {
    test: string;
}
describe('Queue Basics', () => {
    beforeEach(() => {
        queue.removeWorker('testWorker');
    });
    it('add Workers', () => {
        queue.addWorker(
            new Worker<Payload>('testWorker', async (payload: Payload) => {})
        );
        const workers = queue.registeredWorkers;
        const workerNames = Object.keys(workers);
        expect(workerNames.length).toEqual(1);
        expect(workerNames[0]).toEqual('testWorker');
    });
    it('run queue', (done) => {
        const executer = async (payload: Payload) => {
            done();
        };
        queue.addWorker(new Worker<Payload>('testWorker', executer));
        queue.addJob('testWorker', {});
        queue.start();
    });
});
