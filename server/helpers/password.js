import bcrypt from 'bcrypt';


const passwordHash = password => bcrypt.hashSync(password, 10);

const comparePasswords = (userPassword, hashedPassword) => {
  return bcrypt.compareSync(userPassword, hashedPassword);
};

export default {
  passwordHash,
  comparePasswords,
};
