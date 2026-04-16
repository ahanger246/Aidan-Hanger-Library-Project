import { 
  findAllUsers,
  findUserById,
  getUserUpdate,
  getDeletedUser,
  findUserLoans,
  findUserSubs,
  findUserReviews,
  getRoleUpdate
} from '../services/userService.js';

export async function findAllUsersHandler(req, res) {
  const users = await findAllUsers();
  res.status(200).json(users);
}

export async function findUserByIdHandler(req, res) {
  const id = parseInt(req.user.id);
  const user = await findUserById(id);
  res.status(200).json(user);
}

export async function getUserUpdateHandler(req, res) {
  const id = parseInt(req.user.id);
  const { name, email, password } = req.body;
  const updatedUser = await getUserUpdate(id, {name, email, password});
  res.status(200).json(updatedUser);
}

export async function getDeletedUserHandler(req, res) {
  const id = parseInt(req.user.id);
  const deletedUser = await getDeletedUser(id);
  res.status(204).json(deletedUser);
}

export async function findUserLoansHandler(req, res) {
  const id = parseInt(req.user.id);
  const userLoans = await findUserLoans(id);
  res.status(200).json(userLoans);
}

export async function findUserSubsHandler(req, res) {
  const id = parseInt(req.user.id);
  const userSubs = await findUserSubs(id);
  res.status(200).json(userSubs);
}

export async function findUserReviewsHandler(req, res) {
  const id = parseInt(req.user.id);
  const userReviews = await findUserReviews(id);
  res.status(200).json(userReviews);
}

export async function getRoleUpdateHandler(req, res) {
  const id = parseInt(req.params.id);
  const role = req.body.role;
  const user = await getRoleUpdate(id, role);
  res.status(200).json(user);
}