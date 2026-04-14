import express from 'express';
import { 
  findAllUsersHandler,
  findUserByIdHandler,
  getUserUpdateHandler,
  getDeletedUserHandler,
  findUserLoansHandler,
  findUserSubsHandler,
  findUserReviewsHandler,
  getRoleUpdateHandler
} from '../controllers/userController.js';

import { validateUpdateUser, validateRoleUpdate } from '../middleware/userValidators.js';

const router = express.Router();
router.get('/', findAllUsersHandler);
router.get('/me', findUserByIdHandler);
router.put('/me', validateUpdateUser, getUserUpdateHandler);
router.delete('/me', getDeletedUserHandler);
router.get('/me/loans', findUserLoansHandler);
router.get('/me/subscriptions', findUserSubsHandler);
router.get('/me/reviews', findUserReviewsHandler);
router.patch('/:id/role', validateRoleUpdate, getRoleUpdateHandler);

export default router;