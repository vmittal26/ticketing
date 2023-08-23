import { ErrorMessage } from '../model/ErrorMessage';
import { BaseError } from './BaseError';
export declare class DatabaseConnectionError extends BaseError {
    statusCode: number;
    constructor();
    getSerializedErrors(): ErrorMessage[];
}
