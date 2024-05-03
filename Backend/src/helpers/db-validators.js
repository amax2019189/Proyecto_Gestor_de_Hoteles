import User from '../users/user.model.js';
import Roles from '../users/roles.js';

export const isRoleValid = async (rol = '') => {
    const existeRol = await Roles.findOne({rol});
    if (!existeRol){
        throw new Error(`The role: ${rol} is not registered in the database`)
    }
}

export const existEmail = async (email = '') => {
    const existEmail = await User.findOne({email});
    if (existEmail){
        throw new Error(`The email ${email} has already been registered`);
    }
}

export const existUserById = async (id = '') => {
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error(`The ID: ${email} does not exist`);
    }
}