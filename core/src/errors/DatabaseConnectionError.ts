import { ErrorMessage } from '../model/ErrorMessage';
import { BaseError } from './BaseError';

export class DatabaseConnectionError extends BaseError{
    statusCode = 500;

    constructor(){
        super('Database error');
    }
    
    getSerializedErrors(): ErrorMessage[] {
        return [{ message: this.message }];
    }
}