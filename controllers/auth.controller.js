import { request, response } from "express";
import User from "../models/User.js";

import { passwordVerify } from "../helpers/passwordHasing.js";
import { generateJWT } from "../helpers/jwt.js";

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
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
    const token = await generateJWT(user.id);


    res.json({
      user,
      token
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}

export {
  login
}