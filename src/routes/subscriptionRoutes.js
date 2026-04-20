import express from 'express';
import {
  getAllSubsHandler,
  getSubByIdHandler,
  createSubHandler,
  updateSubHandler,
  deleteSubHandler
} from '../controllers/subscriptionController.js';

import {
  validateId,
  validateSub,
  validateSubQuery
} from '../middleware/subscriptionValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeSubOwnership } from '../middleware/authorizeOwnership.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();
router.get('/', authenticate, validateSubQuery, authorizeRoles("ADMIN"), getAllSubsHandler);
router.get('/:id', authenticate, validateId, authorizeRoles("ADMIN"), getSubByIdHandler);
router.post('/', authenticate, validateSub, createSubHandler);
router.put('/:id', authenticate, validateId, authorizeSubOwnership, validateSub, updateSubHandler);
router.delete('/:id', authenticate, validateId, authorizeSubOwnership, deleteSubHandler);

export default router;