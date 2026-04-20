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

export const validateCreateLoan = [
  body('mediaId')
    .exists({values: 'falsy'})
    .withMessage('Media ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Media ID must be a positive integer'),

  handleValidationErrors
];

export const validateUpdateLoan = [
  body('extension')
    .exists({values: 'falsy'})
    .withMessage('extension is required')
    .bail()
    .isInt()
    .withMessage('Extension must be an int'),

  handleValidationErrors
];

export const validateLoanQuery = [
  query('mediaId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Media ID must be a positive integer'),

  query('sortBy')
    .optional()
    .isIn(['id', 'mediaId', 'borrowedAt', 'dueAt', 'borrowerId'])
    .withMessage('sortBy must be one of: id, mediaId, borrowedAt, dueAt, or borrowerId'),

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