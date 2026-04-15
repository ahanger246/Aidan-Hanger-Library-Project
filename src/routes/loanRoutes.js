import express from 'express';
import { 
  getAllLoansHandler,
  getLoanByIdHandler,
  createLoanHandler,
  updateLoanHandler,
  deleteLoanHandler,
  returnLoanHandler
} from '../controllers/loanController.js';

import {
  validateId,
  validateCreateLoan,
  validateUpdateLoan,
  validateLoanQuery
} from '../middleware/loanValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeLoanOwnership } from '../middleware/authorizeOwnership.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();
router.get('/', validateLoanQuery, getAllLoansHandler);
router.get('/:id', validateId, getLoanByIdHandler);
router.post('/', authenticate, validateCreateLoan, createLoanHandler);
router.put(
  '/:id', 
  authenticate, 
  authorizeRoles("ADMIN"), 
  validateId, 
  validateUpdateLoan, 
  updateLoanHandler);
router.delete(
  '/:id',
  authenticate,
  validateId,
  authorizeRoles("ADMIN"),
  deleteLoanHandler);
router.patch('/:id', authenticate, validateId, authorizeLoanOwnership, returnLoanHandler);

export default router;