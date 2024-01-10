import validator from 'express-validator';
const { check } = validator;
import {
  validateResult
} from '../helpers/validate.js';


const validateLogin = [
  check('email', 'Introduce un email válido')
    .exists()
    .notEmpty()
    .isEmail(),
  check('password', 'El password es obligatorio')
    .exists()
    .notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];

const validateGoogleToken = [
  check('googleToken')
    .exists()
    .notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];

export {
  validateLogin,
  validateGoogleToken
};