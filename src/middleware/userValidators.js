import { body, oneof } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateUpdateUser = [
  oneOf(
    [
      body('email').exists({ values: 'falsy' }),
      body('password').exists({ values: 'falsy' })
    ],
    { message: 'At least one field (email, password) must be provided' },
  ),

  body('email')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .isEmail()
    .withMessage("Email address must be formatted correctly"),

  body('password')
    .optional()
    .isLength({ min: 8, max: 50 })
    .withMessage("Password must be between 8 and 50 characters"),

  handleValidationErrors
];

export const validateRoleUpdate = [
  body('role')
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be USER or ADMIN'),

  handleValidationErrors
];