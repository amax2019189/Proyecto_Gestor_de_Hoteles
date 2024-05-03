import User from '../users/user.model.js';

export const existeEmail = async (email = '') => {
    const existeEmail = await User.findOne({email});
    if (existeEmail){
        throw new Error(`The email ${email} has already been registered`);
    }
}

export const existeUserById = async (id = '') => {
    const existeUser = await User.findById(id);
    if(!existeUser){
        throw new Error(`The ID: ${email} does not exist`);
    }
}