import queue from '../Queue';
import { Worker } from '../Worker';

export interface Payload {
    test: string;
}
describe('Queue Basics', () => {
    beforeEach(() => {
        queue.removeWorker('testWorker', true);
        queue.configure({});
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
    it('add Job for invalid Worker', () => {
        queue.addWorker(
            new Worker<Payload>('testWorker', async (payload: Payload) => {})
        );
        expect(() => queue.addJob('wrongWorker', {})).toThrowError('Missing worker with name wrongWorker');
    });

    it('run queue', (done) => {
        const executer = async (payload: Payload) => {
            done();
        };
        queue.addWorker(new Worker<Payload>('testWorker', executer));
        queue.addJob('testWorker', {});
    });

    /**
     * This test will add two jobs to the queue in the order "1", "priority_id" and won't
     * start the queue automatically.
     * The job with "priority_id" has a priority of 100, while the other has one of 0.
     * It is expected that the queue executes the job with the highest priority first when the queue is started,
     * so that the oder of the executed jobs is "priority_id", "1".
     */
    it('handle priority correctly', (done) => {
        const calledOrder: string[] = [];
        const expectedCallOrder = ['priority_id', '1'];

        function evaluateTest() {
            expect(calledOrder).toEqual(expectedCallOrder);
            done();
        }

        const executer = async (payload: Payload) => {
            calledOrder.push(payload.test);

            // evaluate test when both jobs have been executed
            if (calledOrder.length >= 2) {
                // used setTimeout as a workaround
                setTimeout(evaluateTest, 0);
            }
        };
        queue.addWorker(
            new Worker<Payload>('testWorker', executer, { concurrency: 1 })
        );
        queue.addJob('testWorker', { test: '1' }, { attempts: 0, timeout: 0, priority: 0 }, false);
        queue.addJob('testWorker', { test: 'priority_id' }, { priority: 100, attempts: 0, timeout: 0 }, false);
        queue.start();
    });
    it('handle attempts correctly', (done) => {
        const onQueueFinish = () => {
            expect(executer).toBeCalledTimes(6);
            done();
        };
        const executer = jest.fn(() => {
            throw new Error();
        });
        queue.configure({ onQueueFinish: onQueueFinish });
        queue.addWorker(
            new Worker<Payload>('testWorker', executer, { concurrency: 1 })
        );
        queue.addJob('testWorker', { test: '1' }, { attempts: 5, timeout: 0, priority: 0 }, false);
        queue.start();
    });
    it('handle timeouts correctly', (done) => {
        const onQueueFinish = () => {
            expect(executer).toBeCalledTimes(1);
        };
        const onError = (job: Job<Payload>, error: Error) => {
            expect(error).toEqual(new Error(`Job ${job.id} timed out`));
            done();
        };
        const executer = jest.fn(
            () =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 100);
                })
        );
        queue.configure({ onQueueFinish: onQueueFinish });
        queue.addWorker(
            new Worker<Payload>('testWorker', executer, { concurrency: 1, onFailure: onError })
        );
        queue.addJob('testWorker', { test: '1' }, { attempts: 0, timeout: 5, priority: 0 }, false);
        queue.start();
    });
});
