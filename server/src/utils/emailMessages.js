const transporter = require("./smtpServer");
const { USER_EMAIL } = require("../config/dotEnv");

const sendMonthlyReminderToAdmin = async (adminEmail, firstName, lastName) => {
  const mailOptionsOneMonth = {
    from: USER_EMAIL,
    to: adminEmail,
    subject: "1-Month Birthday Reminder",
    html: `<p>Don't forget, ${firstName} ${lastName}'s birthday is coming up in one month!</p>`,
  };
  transporter
    .sendMail(mailOptionsOneMonth)
    .then(() => console.log("email sent succesfully"))
    .catch((error) => {
      console.error("Error sending 1-month reminder email:", error);
    });
};

const sendOneDayReminderToAdmin = async (adminEmail, firstName, lastName) => {
  const mailOptionsOneDay = {
    from: USER_EMAIL,
    to: adminEmail,
    subject: "1-Day Birthday Reminder",
    html: `<p>Don't forget, ${firstName} ${lastName}'s birthday is tomorrow!</p>`,
  };
  transporter
    .sendMail(mailOptionsOneDay)
    .then(() => console.log("email sent successfully"))
    .catch((error) => {
      console.error("Error sending 1-day reminder email:", error);
    });
};

const sendBirthdayMessageToUser = async (userEmail, firstName, lastName) => {
  const mailOptionsOneDay = {
    from: USER_EMAIL,
    to: userEmail,
    subject: "Happy Birthday From Us",
    html: `<p>Happy Birthday, ${firstName} ${lastName}</p>`,
  };
  transporter
    .sendMail(mailOptionsOneDay)
    .then(() => console.log("email sent successfully"))
    .catch((error) => {
      console.error("Error sending 1-day reminder email:", error);
    });
};

module.exports = {
  sendMonthlyReminderToAdmin,
  sendOneDayReminderToAdmin,
  sendBirthdayMessageToUser,
};
