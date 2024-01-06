import { request, response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const jwtValidate = async (req = request, res = response, next) => {
  const { authorization } = req?.headers;
  const token = authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      msg: 'No existe token válido'
    });
  }

  try {
    // Validate jwt an dextract payload
    const { uid } = jwt.verify(token, process.env.SECRET_KEY_JWT);

    // Authenticated user
    const user = await User.findById(uid);
    if (!user) {
      return json.status(401).json({
        msg: 'Token no válido, usuario no existe'
      });
    }
    // Check for status 
    if (!user?.status) {
      return json.status(401).json({
        msg: 'Token no válido, usuario no existe'
      });
    }

    // Save jwt and user to req
    req.user = { user };
    next();
  } catch (error) {
    return res.status(500).json({ msg: 'Error en la validación del token' })
  }
};

export {
  jwtValidate
}