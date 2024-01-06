import jwt from "jsonwebtoken";

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, process.env.SECRET_KEY_JWT, {
      algorithm: 'HS256',
      expiresIn: '1d'
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('Hubo un error al crear el token');
      } else {
        resolve(token);
      }
    });
  });
}

export {
  generateJWT
}