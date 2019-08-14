export interface Job {
    id: string;
    workerName: string;
    active: Bool;
    payload: string;
    metaData: string;
    attempts: number;
    created: string;
    success: Bool;
    failed?: string;
    timeout: number;
    priority: number;
}
export type Bool = TRUE | FALSE;
type FALSE = 0;
type TRUE = 1;
export const FALSE = 0;
export const TRUE = 1;
