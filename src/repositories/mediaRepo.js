import prisma from '../config/db.js';

export async function getAll({search, sortBy, order, offset, limit}) {
  let conditions = {};
    if(search) {
      conditions.OR = [
        {title: {contains: search, mode: 'insensitive'}},
        {author: {contains: search, mode: 'insensitive'}},
        {genre: {contains: search, mode: 'insensitive'}}
      ];
    }

  const media = await prisma.media.findMany({
    where: conditions,
    orderBy: {[sortBy]: order},
    take: limit,
    skip: offset
  });
  return media;
}

export async function getById(id) {
  let media = await prisma.media.findUnique({where: { id }});
  return media;
}

export function create(mediaData) {
  let newMedia = prisma.media.create({ data: mediaData });
  return newMedia;
}

export async function update(id, updatedData) {
  try{
    let updatedMedia = await prisma.media.update({
      where: {id},
      data: updatedData
    });
    return updatedMedia;
  } catch (error) {
    if(error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try{
    let deletedMedia = await prisma.media.delete({
      where: {id}
    });
    return deletedMedia;
  } catch(error) {
    if(error.code === 'P2025') return null;
    throw error;
  }
}