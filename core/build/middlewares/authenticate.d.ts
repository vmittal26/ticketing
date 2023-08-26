import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../model/UserPayload';
declare global {
    namespace Express {
        interface Request {
            currentUser: UserPayload;
        }
    }
}
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => void;
