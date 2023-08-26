import { OrderStatus } from '@coretickets/modules';
import { Order } from '../model/Order';
import { TicketDoc } from '../model/Ticket';


export const findExistingOrderFromTicket = async (ticket:TicketDoc)=>{

    try{
        const existingOrder = await Order.findOne({ticket , status:{
            $in:[
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }});

        return existingOrder;
    }catch(error){
        throw new Error((error as Error)?.message);
    }

};

export const getUserOrders = async (userId:string)=>{

    try{
        const userOrders = await Order.find({userId}).populate('ticket');

        return userOrders;
    }catch(error){
        throw new Error((error as Error)?.message);
    }

};

export const findOrderById = async (orderId:string)=>{

    try{
        const order = await Order.find({orderId}).populate('ticket');

        return order;
    }catch(error){
        throw new Error((error as Error)?.message);
    }

};

