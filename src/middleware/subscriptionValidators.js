import { param, body, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),

  handleValidationErrors
];

export const validateSub = [
  body('title')
    .exists({values: 'falsy'})
    .withMessage('Title is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Subscription title must be at least 3 characters'),

  handleValidationErrors
];

export const validateReviewQuery = [
  query('sortBy')
    .optional()
    .isIn(['id', 'mediaId', 'content', 'createdAt'])
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