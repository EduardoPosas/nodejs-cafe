import { request, response } from "express";

const roleValidate = (req = request, res = response, next) => {
  if (!req?.user) {
    return res.status(500).json({ msg: 'Se requiere el usuario en la request' });
  }
  const { user } = req.user;

  if (user?.role !== 'ADMIN_ROLE') {
    return res.status(401).json({ msg: 'El usuario no tiene permiso para realizar estas operaciones' });
  }

  next();
}

/** This is a way to pass parameters to a middleware: returning a fn */
const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req?.user) {
      return res.status(500).json({ msg: 'Se requiere el usuario en la request' });
    }
    const { user } = req.user;
    if (!roles.includes(user.role)) {
      return res.status(401).json({ msg: `El usuario debe tener un rol: ${roles}` });
    }
    next();
  }
};

export {
  roleValidate,
  hasRole
}