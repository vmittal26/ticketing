import { BaseError } from './BaseError';

export class  NotAuthorizedUser extends BaseError{
    statusCode = 401;

    constructor(public message:string){
        super(message);
    }
}

