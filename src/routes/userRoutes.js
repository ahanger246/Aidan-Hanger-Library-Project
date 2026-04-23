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
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();
router.get('/', authenticate, authorizeRoles('ADMIN'), findAllUsersHandler);
router.get('/testViewUsers', findAllUsersHandler);
router.get('/me', authenticate, findUserByIdHandler);
router.put('/me', authenticate, validateUpdateUser, getUserUpdateHandler);
router.delete('/me', authenticate, getDeletedUserHandler);
router.get('/me/loans', authenticate, findUserLoansHandler);
router.get('/me/subscriptions', authenticate, findUserSubsHandler);
router.get('/me/reviews', authenticate, findUserReviewsHandler);
router.patch('/:id/role', authenticate, authorizeRoles('ADMIN'), validateRoleUpdate, getRoleUpdateHandler);

export default router;