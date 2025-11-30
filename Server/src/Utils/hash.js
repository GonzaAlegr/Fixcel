const bcrypt = require('bcrypt'); 

const SALT_ROUNDS = 10;

const PasswordEncriptar = async (password) => {
  if (!password || typeof password !== 'string') throw new Error('Password inválido');
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const CompararPassword = async (password, hashBD) => {
  if (!password || !hashBD) return false;
  return await bcrypt.compare(password, hashBD);
};

module.exports = { PasswordEncriptar, CompararPassword };