const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  env: {
    SERVER_API_URL: process.env.SERVER_API_URL,
    OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY
  },
};
