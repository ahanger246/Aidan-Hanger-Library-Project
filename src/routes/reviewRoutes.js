import express from 'express';
import { 
  getAllReviewsHandler, 
  getReviewByIdHandler,
  createReviewHandler,
  updateReviewHandler,
  deleteReviewHandler
} from '../controllers/reviewController.js';

import { 
  validateId,
  validateCreateReview,
  validateUpdateReview,
  validateReviewQuery 
} from '../middleware/reviewValidators.js';

const router = express.Router();
router.get('/', validateReviewQuery, getAllReviewsHandler);
router.get('/:id', validateId, getReviewByIdHandler);
router.post('/', validateCreateReview, createReviewHandler);
router.put('/:id', validateId, validateUpdateReview, updateReviewHandler);
router.delete('/:id', validateId, deleteReviewHandler);

export default router;