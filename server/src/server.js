const http = require("http");
const app = require("./app");
const httpServer = http.createServer(app);
const { PORT } = require("./config/dotEnv");
const connectDb = require("./utils/dbConnect");
const cron = require("node-cron");
const {
  sendBirthdayMessage,
  sendADayReminderToAdmin,
  sendMonthlyReminder,
} = require("./services/reminderServices");

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
  await connectDb();
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
