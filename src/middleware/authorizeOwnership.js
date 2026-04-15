import { getReviewById } from '../services/reviewService.js';
import { getLoanById } from '../services/loanService.js';

export async function authorizeReviewOwnership(req, res, next) {
  const id = parseInt(req.params.id);
  const review = await getReviewById(id);

  if(review.authorId !== req.user.id) {
    const error = new Error('Forbidden: Insufficient Permission');
    error.status = 403;
    return next(error);
  }

  next();
}

export async function authorizeLoanOwnership(req, res, next) {
  const id = parseInt(req.params.id);
  const loan = await getLoanById(id);

  if(loan.borrowerId !== req.user.id) {
    const error = new Error('Forbidden: Insufficient Permission');
    error.status = 403;
    return next(error);
  }

  next();
}