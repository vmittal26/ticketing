import { BaseError } from './BaseError';
export declare class BadRequestError extends BaseError {
    statusCode: number;
    constructor(message: string);
}
