import prisma from '../config/db.js';
import { Role } from '../generated/prisma/index.js';

export async function createUser(data) {
  try{
    const newUser = await prisma.user.create({
      data,
      omit: {password: true}
    });
    return newUser;
  } catch(error) {
    if(error.code === 'P2002') {
      const err = new Error('Email has already been used')
      err.status = 409;
      throw err;
    } else {
      throw error;
    }
  }
}

export async function getAllUsers() {
  return await prisma.user.findMany({ omit: { password:true }})
}

export async function getUserById(id) {
  return await prisma.user.findUnique({ where: {id}, omit: {password: true} });
}

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({ where: {email} });
}

export async function updateUser(id, updatedData) {
  try {
    const updatedUser = await prisma.user.update({
      where: {id},
      data: updatedData,
      omit: {password: true} 
    });
    return updatedUser;
  } catch(error) {
    if(error.code === 'P2025') return null;
    if(error.code === 'P2002') {
      const err = new Error('Email has already been used');
      err.status = 409;
      throw err;
    } 
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const deletedUser = prisma.user.delete({ where: {id} });
    return deletedUser;
  } catch(error) {
    if(error.code === 'P2025') return null;
    throw error;
  }
}

export async function getUserLoans(id) {
  return await prisma.loan.findMany({ where: {borrowerId: id} });
}

export async function getUserSubs(id) {
  return await prisma.subscription.findMany({ where: {ownerId: id} });
}

export async function getUserReviews(id) {
  console.log(id);
  return await prisma.review.findMany({ where: {authorId: id} });
}

export async function updateUserRole(id, role) {
  try {
    let userRole;
    if(role === 'ADMIN') {
      userRole = Role.ADMIN;
    } else {
      userRole = Role.USER;
    }
    const user = await prisma.user.update({where: {id}, data: {role: userRole}, omit: {password:true} });
    return user;
  } catch(error) {
    if(error.code === 'P2025') return null;
    throw error;
  }
}