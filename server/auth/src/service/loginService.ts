import { User } from '../model/user';

export const findUser = async (email: string) => {
    console.log('finding user');
    const user = await User.findOne({ email });

    console.log('returned user');
    return user;
};

export const saveUser = async (email: string, password: string) => {
    try{
        console.log('creating user...');
        const user = User.buildUser({ email, password });
        const userDoc = await user.save();

        console.log('user is saved successfully');
        return userDoc;
    
    }catch(error){
        console.log(error);
        throw new Error((error as Error)?.message);
    }
   
};
