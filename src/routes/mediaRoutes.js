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

const router = express.Router();
router.get('/', validateMediaQuery, getAllMediaHandler);
router.get('/:id', validateId, getMediaByIdHandler);
router.post('/', validateCreateMedia, createMediaHandler);
router.put('/:id', validateId, validateUpdateMedia, updateMediaHandler);
router.delete('/:id', validateId, deleteMediaHandler);

export default router;