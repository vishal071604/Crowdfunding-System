import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Sign up a new user
export const signUp = async (req, res) => {
  try {
    const { name, email, password, role, isBlocked } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role:"user",
      isBlocked: false,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Log in an existing user
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: `Email and Password are requested` });
    }

    const alreadyExistingUser = await User.findOne({ email });

    if (!alreadyExistingUser) {
      return res.status(400).json({ message: `User doesn't exist` });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      alreadyExistingUser.password,
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: `Invalid credentials` });
    }

    const token = jwt.sign(
      {
        id: alreadyExistingUser._id,
        role: alreadyExistingUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Logged in successfully", user:alreadyExistingUser._id,
    name: alreadyExistingUser.name,
    email: alreadyExistingUser.email,
    role: alreadyExistingUser.role
      });

  } catch (error) {
    return res.status(500).json({ message: `server error ${error.message}` });
  }
};

// Log out a user
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const profile = async (req, res) => {
  try {
    // get logged in user
    const user = await User.findById(req.user.id).select("-password"); // exclude password from response

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
