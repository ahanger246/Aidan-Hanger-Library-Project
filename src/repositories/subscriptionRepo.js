import prisma from '../config/db.js';

export async function getAll({search, sortBy, order, offset, limit}) {
  let conditions = {};

  if(search) {
    conditions = [
      {title: {contains: search, mode: 'insensitive'}}
    ];
  }

  const subs = await prisma.subscription.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset
  });
  return subs;
}

export async function getById(id) {
  let subscription = await prisma.subscription.findUnique({where: { id }});
  return subscription;
}

export async function create(data) {
  try {
    let newSub = await prisma.subscription.create({ data: data });
    return newSub;
  } catch(error) {
      throw error;
  }
}

export async function update(id, updatedData) {
  try {
    let updatedSub = await prisma.subscription.update({
      where: {id},
      data: updatedData
    });
    return updatedSub;
  } catch(error) {
    if(error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    let deletedSub = await prisma.subscription.delete({
      where: {id}
    });
    return deletedSub;
  } catch(error) {
    if(error.code === 'P2025') return null;
    throw error;
  }
}