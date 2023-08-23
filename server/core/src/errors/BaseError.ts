import { ErrorMessage } from '../model/ErrorMessage';
import { IError } from './IError';

export abstract class BaseError extends Error implements IError{

    abstract statusCode:number;
    constructor(message:string) {
        super(message);
    }
    public getSerializedErrors ():ErrorMessage[]{
      return [{message:this.message}];
    }
}