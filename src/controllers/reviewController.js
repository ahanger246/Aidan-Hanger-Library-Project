import { 
  getAllReviews, 
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} from '../services/reviewService.js';

export async function getAllReviewsHandler(req, res) {
  const {
    mediaId,
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5
  } = req.query;

  const options = {
    mediaId: mediaId ? parseInt(mediaId): undefined,
    search, 
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit)
  };
  let reviews = await getAllReviews(options);
  res.status(200).json(reviews);
}

export async function getReviewByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const review = await getReviewById(id);
  res.status(200).json(review);
}

export async function createReviewHandler(req, res) {
  const { mediaId, content } = req.body;
  const newReview = await createReview({ mediaId, content });
  res.status(201).json(newReview);
}

export async function updateReviewHandler(req, res) {
  const id = parseInt(req.params.id);
  const { content } = req.body;
  const updatedReview = await updateReview(id, { content });
  res.status(200).json(updatedReview);
}

export async function deleteReviewHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteReview(id);
  res.status(204).send();
}