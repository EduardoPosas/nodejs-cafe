import bcrypt from 'bcryptjs';

const passwordHashed = password => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}


export {
  passwordHashed
}