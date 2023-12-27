import express from 'express';
const router = express.Router();

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

router.get('/', getUsers);

router.post('/', createUser);

router.put('/:userId', updateUser);

router.delete('/', deleteUser);


export default router;