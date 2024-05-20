const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./route/userRoute");
const adminRouter = require("./route/adminRoute");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is live");
});

app.use("/users", userRouter);
app.use("/admin", adminRouter);

module.exports = app;
