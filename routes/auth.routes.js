import express from 'express';
const router = express.Router();

import {
  login,
  googleSignIn
} from '../controllers/auth.controller.js';

import {
  validateLogin,
  validateGoogleToken
} from '../middleware/auth.js';


router.post('/login', validateLogin, login);

router.post('/google', validateGoogleToken, googleSignIn);

// router.put('/:userId', validateUpdate, updateUser);

// router.delete('/:userId', validateDelete, deleteUser);


export default router;