import bcrypt from 'bcryptjs';

const passwordHashed = password => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

const passwordVerify = (introducedPassword, actualPassword) => {
  return bcrypt.compareSync(introducedPassword, actualPassword);
}


export {
  passwordHashed,
  passwordVerify
}