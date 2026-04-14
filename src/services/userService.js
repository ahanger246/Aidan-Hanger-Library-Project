import bcrypt from 'bcrypt';
import { 
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserLoans,
  getUserSubs,
  getUserReviews,
  updateUserRole
} from '../repositories/userRepo.js';


export async function findAllUsers() {
  return await getAllUsers();
}

export async function findUserById(id) {
  const user = await getUserById(id);
  if(user) return user;
  else {
    const error = new Error(`User ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function getUserUpdate(id, updatedData) {
  if(updatedData.password) {
    updatedData.password = bcrypt.hash(updatedData.password, 10);
  }
  const updatedUser = await updateUser(id, updatedData);
  if(updatedUser) return updatedUser;
  else {
    const error = new Error(`User ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function getDeletedUser(id) {
  const deletedUser = await deleteUser(id);
  if(deletedUser) return deletedUser;
  else {
    const error = new Error(`User ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function findUserLoans(id) {
  return await getUserLoans(id);
}

export async function findUserSubs(id) {
  return await getUserSubs(id);
}

export async function findUserReviews(id) {
  return await getUserReviews(id);
} 

export async function getRoleUpdate(id, role) {
  const roleUpdate = await updateUserRole(id, role);
  if(roleUpdate) return roleUpdate;
  else {
    const error = new Error(`User ${id} not found`);
    error.status = 404;
    throw error;
  }
}