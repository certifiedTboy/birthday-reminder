const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const { DB_URI } = require("./config/dotEnv");
const httpServer = http.createServer(app);
const { PORT } = require("./config/dotEnv");
const cron = require("node-cron");
const {
  sendBirthdayMessage,
  sendADayReminderToAdmin,
  sendMonthlyReminder,
} = require("./services/reminderServices");

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Schedule the sendBirthdayReminder function to run every day at 8:00 AM
cron.schedule(
  "0 14 * * *",
  async () => {
    await sendBirthdayMessage();
    await sendADayReminderToAdmin();
  },
  {
    scheduled: true,
    timezone: "Africa/Lagos", // e.g., 'Central African Timezone'
  }
);

cron.schedule("0 14 1 * *", async () => {
  await sendMonthlyReminder();
});

const startServer = async () => {
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
