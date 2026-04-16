import {
  getAllSubs,
  getSubById,
  createSub,
  updateSub,
  deleteSub
} from '../services/subscriptionService.js';

export async function getAllSubsHandler(req, res) {
  const {
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5
  } = req.query;

  const options = {
      search,
      sortBy,
      order,
      offset: parseInt(offset),
      limit: parseInt(limit)
  };
  let subs = await getAllSubs(options);
  res.status(200).json(subs);
}

export async function getSubByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const sub = await getSubById(id);
  res.status(200).json(sub);
}

export async function createSubHandler(req, res) {
  const { title } = req.body;
  const newSub = await createSub({title, ownerId: req.user.id})
  res.status(200).json(newSub);
}

export async function updateSubHandler(req, res) {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  const updatedSub = await updateSub(id, { title });
  res.status(200).json(updatedSub);
}

export async function deleteSubHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteSub(id);
  res.status(204).send();
}