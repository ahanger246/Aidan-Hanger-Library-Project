import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),

  handleValidationErrors,
];

export const validateCreateMedia = [
  body('title')
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .bail()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('author')
    .exists({ values: 'falsy' })
    .withMessage('Author name is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Author name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Author name must be at least 3 characters'),

  body('genre')
    .exists({ values: 'falsy' })
    .withMessage('Genre is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Genre must be a string')
    .bail()
    .isLength({ min: 3})
    .withMessage('Genre must be at least 3 characters'),

    body('format')
    .exists({ values: 'falsy' })
    .withMessage('Format is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Format must be a string')
    .bail()
    .isLength({ min: 3})
    .withMessage('Format must be at least 3 characters'),

  handleValidationErrors,
];

export const validateUpdateMedia = [
  oneOf(
    [
      body('title').exists({ values: 'falsy' }),
      body('author').exists({ values: 'falsy' }),
      body('genre').exists({ values: 'falsy' }),
      body('format').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field (title, author, genre) must be provided' },
  ),

  body('title')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('author')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Author name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Author name must be at least 3 characters'),

  body('genre')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Genre must be a string')
    .bail()
    .isLength({ min: 3})
    .withMessage('Genre must be at least 3 characters'),

  handleValidationErrors
];

export const validateMediaQuery = [
  query('sortBy')
    .optional()
    .isIn(['id', 'title', 'author', 'genre'])
    .withMessage('sortBy must be one of: id, title, author, or genre'),

  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('order must be either asc or desc'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be a non-negative integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50})
    .withMessage('limit must be an integer between 1 and 50'),

  handleValidationErrors
];