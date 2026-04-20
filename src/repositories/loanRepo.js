import prisma from '../config/db.js';
import { Status } from '../generated/prisma/index.js';

export async function getAll({mediaId, search, sortBy, order, offset, limit}) {
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

  const loans = await prisma.loan.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset
  });
  return loans;
}

export async function getById(id) {
  let loan = await prisma.loan.findUnique({where: { id }});
  return loan;
}

export async function create(data) {
  try {
    let newLoan = await prisma.loan.create({ data: data });
    return newLoan;
  } catch(error) {
    console.log(error.code);
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
    let loan = await prisma.loan.findUnique({ where: {id} });
    let newDueDate = new Date(loan.dueAt.toISOString().split('T')[0]);
    newDueDate.setDate(newDueDate.getDate() + updatedData.extension * 7);
    let updatedLoan = await prisma.loan.update({
      where: {id},
      data: {dueAt: newDueDate}
    });
    return updatedLoan;
  } catch(error) {
    if(error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    let deletedLoan = await prisma.loan.delete({
      where: {id}
    });
    return deletedLoan;
  } catch(error) {
    if(error.code === 'P2025') return null;
    throw error;
  }
}

export async function giveBack(id) {
  try {
    const loan = await prisma.loan.update({where: {id}, data: {status: Status.RETURNED}});
    return loan;
  } catch (error) {
    if(error.code === 'P2025') return null;
    throw error;
  }
}