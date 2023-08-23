import { FieldValidationError } from 'express-validator';
import { BaseError } from './BaseError';
import { ErrorMessage } from '../model/ErrorMessage';

export class RequestValidationError extends BaseError {
    statusCode = 400;
    
    constructor( message:string,public errors: FieldValidationError[]) {
        super(message);
    }
    public getSerializedErrors():ErrorMessage[] {
        return this.errors.map(error => {
            return { message: error.msg as string,  field:error.path};
        });
    }
}