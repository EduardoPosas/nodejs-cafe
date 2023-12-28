import validator from 'express-validator';
const { validationResult } = validator;

import User from '../models/User.js';
import Role from '../models/Role.js';

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(403);
        res.send({
            errors: error.array()
        });
    }
}

const emailExist = async (email) => {
    const userExist = await User.findOne({ email });
    if (userExist?.email) {
        throw new Error('El usuario ya está registrado')
    }
    return true;
}

const roleExist = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error('El rol no existe en la base de datos')
    }
    return true;
}

const userIdExist = async (id) => {
    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error('No existe usuario con el id especificado');
    }
    return true;
}

export {
    validateResult,
    emailExist,
    roleExist,
    userIdExist
};

