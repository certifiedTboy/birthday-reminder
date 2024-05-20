const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const generateRandomToken = require("../utils/tokenHelper");
const transporter = require("../utils/smtpServer");
const hashPassword = require("../utils/passwordEncryptor");

const admins = [
  { firstName: "Adebisi", lastName: "Tosin", email: "etosin70@gmail.com" },
  {
    firstName: "Eniola",
    lastName: "Abiodun",
    email: "abiodun.eniola@yahoo.com",
  },
];

// const createAdmin = async () => {
//   const newAdmins = await Admin.create(admins);

//   console.log(newAdmins);
// };

const createNewUserBirthday = async (req, res) => {
  try {
    const { email, firstName, lastName, dateOfBirth } = req.body;

    const month = String(new Date(dateOfBirth).getMonth() + 1).padStart(2, "0");
    const day = String(new Date(dateOfBirth).getDate()).padStart(2, "0");

    const userAlreadyCreatedBirthday = await User.findOne({ email });

    if (userAlreadyCreatedBirthday) {
      return res
        .status(400)
        .json({ error: "user with this email already exist" });
    }

    const newUser = new User({ email, firstName, lastName, month, day });
    await newUser.save();

    if (!newUser) {
      return res.status(400).json({ error: "user birthday creation failed" });
    }

    return res
      .status(201)
      .json({ message: "birthday created successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
};

// Assuming you have exported the Nodemailer transporter from a separate file

const createNewAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const verificationToken = await generateRandomToken(32);
    const hashedPassword = await hashPassword(password);

    const admin = new Admin({
      firstName,
      lastName,
      email,
      password: hashPassword,
      verificationToken,
      confirmPassword,
    });

    const savedAdmin = await admin.save();

    if (!savedAdmin) {
      return res.status(400).json({ error: "Failed to create admin" });
    }

    // Send email with verification token
    const mailOptions = {
      from: "jasperojukwu2@gmail.com",
      to: email,
      subject: "Verification Token",
      text: `Your verification token is: ${verificationToken}`,
      html: `<p>Your verification token is: <b>${verificationToken}</b></p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(500).json({ error: "Email not Sent" });
        // Handle error response
      }
    });

    return res.status(201).json({
      message:
        "Admin created successfully Check your Email to confirm Verification",
      admin: savedAdmin,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const newAdminVerification = async (req, res) => {
  const { verificationToken } = req.body;
  const admin = await Admin.findOne({ verificationToken });

  if (!admin) {
    return res.status(400).json({ error: "Invalid Token" });
  }
  admin.isVerified = true;
  admin.verificationToken = undefined;
  await admin.save();

  return res.status(200).json({ message: "Admin verified" });
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email, password });
  if (!admin) {
    return res.status(400).json({ error: "Invalid Email or Password" });
  }
  return res.status(200).json({ message: "Login Successful" });
};

module.exports = {
  createNewAdmin,
  newAdminVerification,
  adminLogin,
  createNewUserBirthday,
};
