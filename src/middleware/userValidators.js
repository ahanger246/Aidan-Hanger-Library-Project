import { body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateSignUp = [
  body('name')
    .exists({values: 'falsy'})
    .withMessage('Name is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string'),

  body('email')
    .exists({values: 'falsy'})
    .withMessage('email is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .isEmail()
    .withMessage("Email address must be formatted correctly"),

  body('password')
    .exists({values: 'falsy'})
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 50 })
    .withMessage("Password must be between 8 and 50 characters"),

  handleValidationErrors
];

export const validateLogIn = [
  body('email')
    .exists({values: 'falsy'})
    .withMessage('Email is required'),

  body('password')
    .exists({values: 'falsy'})
    .withMessage('Password is required'),

  handleValidationErrors
];

export const validateUpdateUser = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('email').exists({ values: 'falsy' }),
      body('password').exists({ values: 'falsy' })
    ],
    { message: 'At least one field (name, email, password) must be provided' },
  ),

  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage("Email must be a string"),  

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