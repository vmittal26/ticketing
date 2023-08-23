import { BaseError } from './BaseError';
export declare class NotAuthorizedUser extends BaseError {
    message: string;
    statusCode: number;
    constructor(message: string);
}
