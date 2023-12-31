import { request, response } from "express";
import User from "../models/User.js";

import { passwordVerify } from "../helpers/passwordHasing.js";

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  // User Existance verification
  const user = await User.findOne({ email });

  if (!user?.email) {
    return res.status(400).json({
      msg: 'Usuario inexistente - email'
    });
  }

  // Check user status
  if (!user?.status) {
    return res.status(400).json({
      msg: 'Usuario dado de baja - email'
    });
  }

  // Check password
  const isValidPassword = passwordVerify(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({
      msg: 'Contraseña errónea - password'
    });
  }

  // Crear token


  res.send('<h1>Desde login</h1>');
}

export {
  login
}