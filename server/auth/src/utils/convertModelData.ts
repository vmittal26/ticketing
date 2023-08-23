import mongoose from 'mongoose';

export const covertModelData = <T extends mongoose.Document>(model:T)=>{

     model.id = model._id;
     delete model.__v;
     delete model._id;
     
     return model;
};