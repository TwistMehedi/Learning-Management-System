import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import TryCatch from "./../utils/TryCatch.js";
import { ErrorHandler } from './../utils/ErrorHandler.js';
import User from "../models/user.model.js";

export const registerUser = TryCatch(async (req, res, next) => {
  const { name, email, password, role, phone, socialLinks } = req.body;

  if (!name || !email || !password) next(new ErrorHandler("Please provide all required fields", 400));

  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new ErrorHandler("User already registered", 400));

  const valiadteRole = ["student", "instructor", "admin"];
  const userRole = valiadteRole.includes(role) ? role : "student";
 
  const token = jwt.sign(
    { name, email, password, role: userRole , phone, socialLinks },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );
 
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email to complete registration",
    html: `
        <p>Hello <strong>${name}</strong>,</p>
        <p>Please click the link below to verify your email and complete your registration:</p>
        <a href="http://localhost:5173/verify-email?token=${token}">Verify Email</a>
        <p>This link will expire in 10 minutes.</p>
      `,
  };

  await transporter.sendMail(emailOptions);

  res
    .status(200)
    .json({ message: "Verification email sent. Please check your inbox." , token});
});

export const verifyEmailAndCreateUser = TryCatch(async (req, res, next) => {
  const token = req.query.token;

  if (!token) return next(new ErrorHandler("Token is required", 400));

  // Decode token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return next(new ErrorHandler("Invalid or expired token", 400));

  const { name, email, password, role, phone, socialLinks } = decoded;

  // Check if already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) next(new ErrorHandler("User already registered", 400))


  const user = await User.create({
    name,
    email,
    password,
    role,
    phone,
    socialLinks: {
      github: socialLinks?.github || "",
      linkedin: socialLinks?.linkedin || "",
      facebook: socialLinks?.facebook || "",
      twitter: socialLinks?.twitter || "",
    },
    lastLogin: new Date(),
    isVerified: true
  });

  const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res
    .cookie("token", authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      message: "✅ Email verified and user created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        socialLinks: {
          github: user.socialLinks.github,
          linkedin: user.socialLinks.linkedin,
          facebook: user.socialLinks.facebook,
          twitter: user.socialLinks.twitter,
        },
        lastLogin: user.lastLogin,
      },
    });
});

// Login user
export const loginUser = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) next(new ErrorHandler("Please provide email and password", 400));
     
  const user = await User.findOne({ email });
  if (!user) next(new ErrorHandler("Invalid credentials", 400));

  const isMatch = await user.matchPassword(password);
  if (!isMatch) next(new ErrorHandler("Invalid credentials", 400));

  const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res
    .cookie("token", authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      },
    });
});

export const logoutUser = TryCatch(async (_, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
});
