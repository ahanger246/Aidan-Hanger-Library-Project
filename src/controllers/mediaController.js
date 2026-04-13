import { 
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia
} from '../services/mediaService.js';

export async function getAllMediaHandler(req, res) {
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
  let media = await getAllMedia(options);
  res.status(200).json(media);
}

export async function getMediaByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const media = await getMediaById(id);
  res.status(200).json(media);
}

export async function createMediaHandler(req, res) {
  const {title, author, genre} = req.body;
  const newMedia = await createMedia({ title, author, genre });
  res.status(201).json(newMedia);
}

export async function updateMediaHandler(req, res) {
  const id = parseInt(req.params.id);
  const {title, author, genre} = req.body;
  const updatedMedia = await updateMedia(id, {title, author, genre});
  res.status(200).json(updatedMedia); 
}

export async function deleteMediaHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteMedia(id);
  res.status(204).send();
}