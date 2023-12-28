import validator from 'express-validator';
const { check } = validator;
import {
  validateResult,
  emailExist,
  roleExist,
  userIdExist
} from '../helpers/validate.js';


const validateCreate = [
  check('name', 'Introduce un nombre válido')
    .exists()
    .notEmpty(),
  check('email', 'Introduce un email válido')
    .exists()
    .notEmpty()
    .isEmail()
    .custom(emailExist),
  check('password', 'Introduce un password válido')
    .exists()
    .notEmpty()
    .isLength({ min: 6 }),
  check('image')
    .exists(),
  check('role', 'Selecciona un rol de usuario válido')
    .exists()
    .notEmpty()
    .custom(roleExist),
  // .isIn(['ADMIN_ROLE', 'USER_ROLE']),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];

const validateUpdate = [
  check('userId', 'Id del usuario inexistente')
    .exists()
    .notEmpty()
    .isMongoId()
    .custom(userIdExist),
  check('name')
    .exists()
    .notEmpty(),
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 6 }),
  check('role', 'Selecciona un rol de usuario válido')
    .exists()
    .notEmpty()
    .custom(roleExist),
  check('image')
    .exists(),
  (req, res, next) => {
    validateResult(req, res, next);
  }
]

const validateLimit = [
  check('limit', 'Cantidad de usuarios no valida')
    .exists()
    .notEmpty()
    .optional(),
  check('from', 'Numero de registro desde no valido')
    .exists()
    .notEmpty()
    .optional(),
  (req, res, next) => {
    validateResult(req, res, next);
  }
]

const validateDelete = [
  check('userId', 'Id del usuario inexistente')
    .exists()
    .notEmpty()
    .isMongoId()
    .custom(userIdExist),
  (req, res, next) => {
    validateResult(req, res, next);
  }
]

export {
  validateCreate,
  validateUpdate,
  validateLimit,
  validateDelete
};