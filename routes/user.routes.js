import express from 'express';
const router = express.Router();

import { jwtValidate } from '../middleware/jwtValidate.js';
import { roleValidate, hasRole } from '../middleware/roleValidate.js';

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

// router.delete('/:userId', jwtValidate, roleValidate, validateDelete, deleteUser);
router.delete('/:userId', jwtValidate, hasRole('USER_ROLE', 'ADMIN_ROLE'), validateDelete, deleteUser);


export default router;