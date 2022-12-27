require("dotenv").config();

const { PORT = 3001, DB_HOST, SECRET_KEY, SECRET_KEY_REFRESH } = process.env;

module.exports = {
  PORT,
  DB_HOST,
  SECRET_KEY,
  SECRET_KEY_REFRESH,
};
