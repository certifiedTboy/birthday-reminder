const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  ACCESS_TOKEN,
  USER_EMAIL,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
} = require("../config/dotEnv");
// const Oauth2 = google.auth.OAuth2;

const myOauth2Client = new Oauth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

myOauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: USER_EMAIL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: ACCESS_TOKEN,
  },
});

// const transporter = nodemailer.createTransport({
//   host: SMTP_HOST,
//   port: SMTP_PORT || 2525,
//   secure: false,
//   auth: {
//     user: SMTP_USER,
//     pass: SMTP_PASSWORD,
//   },
// });

module.exports = transporter;
