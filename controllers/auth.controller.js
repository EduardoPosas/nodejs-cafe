import { request, response } from "express";
import User from "../models/User.js";

import { passwordVerify } from "../helpers/passwordHasing.js";
import { generateJWT } from "../helpers/jwt.js";
import { googleTokenVerification } from "../helpers/googleVerification.js";

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

const googleSignIn = async (req = request, res = response) => {
  const { googleToken } = req?.body;

  try {
    // Verificar Token y datos de usuario
    const { email, name, image } = await googleTokenVerification(googleToken);

    // Check if google user exists in db
    let user = await User.findOne({ email });
    if (!user) {
      // Create new user
      const data = {
        name,
        email,
        image,
        google: true,
        password: ':)',
        role: 'USER_ROLE'
      }
      user = new User(data);
      user.save();
    }

    if (!user.status) {
      return res.status.json({
        msg: 'Hable con el administrador, usuario bloqueado'
      });
    }

    // Create JWT 
    const token = await generateJWT(user.id);

    return res.json({
      user,
      token
    })
  } catch (error) {
    return res.status(400).json({
      status: false,
      msg: 'Error al validar el token de google'
    })
  }
}

export {
  login,
  googleSignIn
}