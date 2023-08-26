import { Subjects } from "./Subjects";

export interface TicketCreatedEvent{
    subject:Subjects.TicketCreatedEvent,
    data:{
        userId:string;
        title:string;
        price:number;
        id:string
        version:number;
    }
}