const dotenv = require("dotenv");
dotenv.config();
/**
 *@description centarl point of all environmental variables and dotenv configuration
 */

module.exports = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  CLIENT_ID: process.env.EMAIL_CLIENT_ID,
  CLIENT_SECRET: process.env.EMAIL_CLIENT_SECRET,
  ACCESS_TOKEN: process.env.EMAIL_ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.EMAIL_REFRESH_TOKEN,
  USER_EMAIL: process.env.EMAIL_USER_EMAIL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
};
