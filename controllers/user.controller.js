/**
 * Importing response and request helps to autocompletion on vscode
 */
import { response, request } from "express";
import User from "../models/User.js";
import { passwordHashed } from "../helpers/passwordHasing.js";

const getUsers = async (req = request, res = response) => {

  const { limit = 5, from } = req?.query;

  const [totalUsers, users] = await Promise.all([
    User.countDocuments({ status: true }),
    User.find({ status: true })
      .skip(Number(from))
      .limit(Number(limit))
  ]);

  return res.json({
    totalUsers,
    users
  });
}

const createUser = async (req = request, res = response) => {

  // If user not exists already
  const user = new User(req?.body);

  // Password hashing
  user.password = passwordHashed(user.password);

  // User Registration
  await user.save();

  res.json({
    user
  });
}

const updateUser = async (req = request, res = response) => {

  const { userId } = req?.params;
  const { email, google, status, password, ...data } = req.body;

  // Check if password changed
  if (password.length) {
    data.password = passwordHashed(password);
  }

  // Update User
  const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true })

  res.json({
    updatedUser
  });
}

const deleteUser = async (req = request, res = response) => {

  const { userId } = req.params;

  // Delete User: by updating status to false
  await User.findByIdAndUpdate(userId, { status: false });

  res.json({
    msg: 'Usuario eliminado con exito',
  });
}

export {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}