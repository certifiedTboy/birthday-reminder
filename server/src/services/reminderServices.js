const {
  sendMonthlyReminderToAdmin,
  sendOneDayReminderToAdmin,
  sendBirthdayMessageToUser,
} = require("../utils/emailMessages");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

const sendMonthlyReminder = async () => {
  const month = String(new Date().getMonth() + 1).padStart(2, "0");

  // Find users with birthdays in one month
  const users = await User.find({ month });
  if (users || users.length > 0) {
    for (const user of users) {
      await sendMonthlyReminderToAdmin(
        "etosin70@gmail.com",
        user?.firstName,
        user?.lastName
      );
    }
  }
};

const sendBirthdayMessage = async () => {
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const day = String(new Date().getDate()).padStart(2, "0");
  // Find users whose birthday is today
  const users = await User.find({ month, day: { $eq: day } });

  if (users || users.length > 0) {
    for (const user of users) {
      await sendBirthdayMessageToUser(
        user?.email,
        user?.firstName,
        user?.lastName
      );
    }
  }
};

const sendADayReminderToAdmin = async () => {
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const day = String(new Date().getDate()).padStart(2, "0");

  const nextDay = +day + 1;

  const users = await User.find({ day: { $eq: nextDay } });

  if (users || users.length > 0) {
    for (const user of users) {
      await sendOneDayReminderToAdmin(
        "etosin70@gmail.com",
        user?.firstName,
        user?.lastName
      );
    }
  }
};

module.exports = {
  sendMonthlyReminder,
  sendBirthdayMessage,
  sendADayReminderToAdmin,
};
