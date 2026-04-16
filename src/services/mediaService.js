import { 
  getAll,
  getById,
  create,
  update,
  remove,
  getMediaLoans,
  getMediaReviews
} from '../repositories/mediaRepo.js';

export async function getAllMedia(options) {
  return getAll(options);
}

export async function getMediaById(id) {
  const media = await getById(id);
  if(media) return media;
  else {
    const error = new Error(`Media ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createMedia(mediaData) {
  return create(mediaData);
} 

export async function updateMedia(id, updatedData) {
  const updatedMedia = await update(id, updatedData);
  if(updatedMedia) return updatedMedia;
  else {
    const error = new Error(`Media ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteMedia(id) {
  const result = await remove(id);
  if(result) return result;
  else {
    const error = new Error(`Media ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function findMediaLoans(id) {
  return await getMediaLoans(id);
}

export async function findMediaReviews(id) {
  return await getMediaReviews(id);
}