import {
  getAll,
  getById,
  create,
  update,
  remove
} from '../repositories/subscriptionRepo.js';

export async function getAllSubs(options) {
  return getAll(options);
}

export async function getSubById(id) {
   const sub = await getById(id);
    if(sub) return sub;
    else {
      const error = new Error(`Subscription ${id} not found`);
      error.status = 404;
      throw error;
    }
}

export async function createSub(subData) {
  return create(subData);
}

export async function updateSub(id, data) {
  const updatedSub = await update(id, data);
  if(updatedSub) return updatedSub;
  else {
    const error = new Error(`Subsciption ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteSub(id) {
  const result = remove(id);
  if(result) return result;
  else {
    const error = new Error(`Subscription ${id} not found`);
    error.status = 404;
    throw error;
  }
}