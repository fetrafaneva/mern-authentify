import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import "dotenv/config";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validation des données
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT secret not configured",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Sending welcome email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Shining Prism",
      text: `Welcome to Shining Prism website. Your account have been created with email id: ${email}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    // Message volontairement générique (sécurité)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= LOGOUT ================= */
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//---------------  sendVerifyOtp  -------------//
// Send Verification OTP to the User's Email
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    // 400 - Bad Request
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await userModel.findById(userId);

    // 404 - Not Found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 400 - Bad Request
    if (user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "Account already verified",
      });
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24h

    await user.save();

    const mailOptions = {
      from: `"Shining Prism" <${process.env.EMAIL_USER}>`,
      to: user.email, // ✅ correction ici
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. It will expire in 24 hours.`,
    };

    await transporter.sendMail(mailOptions);

    // 200 - OK
    return res.status(200).json({
      success: true,
      message: "Verification OTP sent to email",
    });
  } catch (error) {
    console.error("Send OTP Error:", error);

    // 500 - Internal Server Error
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

//---------------  verifyEmail  -------------//
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  // 400 → données manquantes
  if (!userId || !otp) {
    return res.status(400).json({
      success: false,
      message: "UserId and OTP are required",
    });
  }

  try {
    const user = await userModel.findById(userId);

    // 404 → utilisateur introuvable
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 400 → OTP invalide
    if (!user.verifyOtp || user.verifyOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // 400 → OTP expiré
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // Succès
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = null;

    await user.save();

    // 200 → succès
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("VERIFY EMAIL ERROR ❌", error);

    // 500 → erreur serveur
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
