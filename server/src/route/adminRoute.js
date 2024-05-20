const express = require("express");
const adminRouter = express.Router();

const {
  createNewAdmin,
  newAdminVerification,
  adminLogin,
  createNewUserBirthday,
} = require("../controller/adminController");

adminRouter.post("/birthday", createNewUserBirthday);
adminRouter.post("/", createNewAdmin);
adminRouter.put("/verify", newAdminVerification);
adminRouter.post("/login", adminLogin);

module.exports = adminRouter;
