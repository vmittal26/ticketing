import { Ticket } from '../model/Ticket';

export const findByIdAndVersion = async({id , version}:{id:string , version:number})=>{
    try{
        console.log(`finding ticket by id  ${id} and version ${version}`);
        const ticket = await Ticket.findOne({_id:id, version:version-1});

        console.log('returning ticket...');
        return ticket;

    }catch(error){
          throw new Error((error as Error)?.message);
    }
};