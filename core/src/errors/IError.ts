import { ErrorMessage } from "../model/ErrorMessage";

export interface IError{
    statusCode:number;
    getSerializedErrors:()=> ErrorMessage[]
}