import express from 'express';
import { 
  getAllMediaHandler,
  getMediaByIdHandler,
  createMediaHandler,
  updateMediaHandler,
  deleteMediaHandler
} from '../controllers/mediaController.js';

import { 
  validateId,
  validateCreateMedia,
  validateUpdateMedia,
  validateMediaQuery
} from '../middleware/mediaValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();
router.get('/', authenticate, validateMediaQuery, getAllMediaHandler);
router.get('/:id', authenticate, validateId, getMediaByIdHandler);
router.post('/', authenticate, authorizeRoles("ADMIN"), validateCreateMedia, createMediaHandler);
router.put('/:id', authenticate, authorizeRoles("ADMIN"), validateId, validateUpdateMedia, updateMediaHandler);
router.delete('/:id', authenticate, authorizeRoles("ADMIN"), validateId, deleteMediaHandler);

export default router;