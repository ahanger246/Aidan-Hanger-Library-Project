import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../repositories/userRepo.js';

export async function signUp(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({name, email, password: hashedPassword});
  return newUser;
}

export async function logIn(email, password) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
  const error = new Error('Invalid Credentials');
  error.status = 401;
  
  const user = await getUserByEmail(email);
  if(!user) throw error;

  const match = await bcrypt.compare(password, user.password);
  if(!match) throw error;

  const accessToken = jwt.sign({id: user.id, role: user.role}, JWT_SECRET, {expiresIn: JWT_EXPIRATION});

  return accessToken;
}