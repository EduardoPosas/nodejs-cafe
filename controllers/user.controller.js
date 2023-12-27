/**
 * Importing response and request helps to autocompletion on vscode
 */
import { response, request } from "express";

const getUsers = (req = request, res = response) => {

  const { limit = 10, apikey } = req.query;

  res.json({
    msg: 'Obteniendo Usuarios',
    limit,
    apikey
  });
}

const createUser = (req = request, res = response) => {

  const { email, name } = req?.body;

  res.json({
    msg: 'Creando Usuario',
    body: {
      email,
      name
    }
  });
}

const updateUser = (req = request, res = response) => {

  const { userId } = req.params;

  res.json({
    msg: 'Actualizando Usuario',
    userId
  });
}

const deleteUser = (req = request, res = response) => {
  res.json({
    msg: 'Eliminando Usuario'
  });
}

export {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}