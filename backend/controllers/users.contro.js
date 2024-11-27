import { User } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// REGISTER
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(500).json({
        success: false,
        message: "Please provide all fields",
      });
    }
    // chekc user
    const exisiting = await User.findOne({ email });
    if (exisiting) {
      return res.status(500).json({
        success: false,
        message: "Email already registerd please Login",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    //validation
    if (!username || !password) {
      return res.status(500).json({
        success: false,
        message: "Please provide email or password",
      });
    }

    //check user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    //check user password  | compare password
    // bcrypt.compare(password, user.password, (err, data) => {
    //   if (data) {
    //     const authClaims = [
    //       { name: username },
    //       { jti: jwt.sign({}, process.env.JWT_SECRET) },
    //     ];
    //     const token = jwt.sign({ authClaims }, JWT_SECRET, { expiresIn: "2d" });
    //     res.status(200).json({ id: user._id, token: token });
    //   } else {
    //     return res.status(400).json({ message: "invalid" });
    //   }
    // });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      id: user._id,
      token: token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};
