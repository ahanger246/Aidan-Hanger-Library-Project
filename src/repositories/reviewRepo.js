import prisma from '../config/db.js';

export async function getAll({mediaId, search, sortBy, order, offset, limit}) {
  console.log('repo');
  let conditions = {};

  if(mediaId && !search) {
    conditions = { mediaId: {equals: mediaId} };
  } else if(!mediaId && search) {
    conditions = {content: {contains: search, mode: 'insensitive'}};
  } else if(mediaId && search) {
    conditions.AND = [
      {mediaId: {equals: mediaId}},
      {content: {contains: search, mode: 'insensitive'}}
    ];
  }

  const reviews = await prisma.review.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset
  });
  return reviews;
}

export async function getById(id) {
  let review = await prisma.review.findUnique({where: { id }});
  return review;
}

export async function create(data) {
  try {
    let newReview = await prisma.review.create({ data: data });
    return newReview;
  } catch(error) {
    if(error.code === 'P2003') {
      const error = new Error(`Cannot create review: Referenced media with id ${data.mediaId} does not exist`);
      error.status = 400;
      throw error;
    } else {
      throw error;
    }
  }
}

export async function update(id, updatedData) {
  try {
    let updatedReview = await prisma.review.update({
      where: {id},
      data: updatedData
    });
    return updatedReview;
  } catch(error) {
    if(error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    let deletedReview = await prisma.review.delete({
      where: {id}
    });
    return deletedReview;
  } catch(error) {
    if(error.code === 'P2025') return null;
    throw error;
  }
}