import express from 'express';
const router = express.Router();

import {
  login
} from '../controllers/auth.controller.js';

import {
  validateLogin
} from '../middleware/auth.js';


router.post('/login', validateLogin, login);

// router.post('/', validateCreate, createUser);

// router.put('/:userId', validateUpdate, updateUser);

// router.delete('/:userId', validateDelete, deleteUser);


export default router;