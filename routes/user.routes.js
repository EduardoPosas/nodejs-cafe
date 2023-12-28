import express from 'express';
const router = express.Router();

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

import {
  validateCreate,
  validateUpdate,
  validateLimit,
  validateDelete
} from '../middleware/user.js';

router.get('/', validateLimit, getUsers);

router.post('/', validateCreate, createUser);

router.put('/:userId', validateUpdate, updateUser);

router.delete('/:userId', validateDelete, deleteUser);


export default router;