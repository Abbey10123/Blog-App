const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async ({ email, password }) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json(404, { message: "Invalid credentials" });
    }
    console.log(user);

    const validPassword = await user.isValidPassword(password);
    if (!validPassword) {
      return {
        code: 400,
        success: false,
        data: null,
        message: "Invalid credentials",
      };
    }
    const token = await jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return {
      code: 200,
      data: { user, token },
      message: "Login Successful",
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      data: null,
      message: error.message,
    };
  }
};

const signUp = async ({ username, first_name, last_name, password, email }) => {
  try {
    const newUser = await UserModel.create({
      first_name,
      last_name,
      username,
      email,
      password,
    });

    const token = await jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    delete newUser.password;
    return {
      code: 201,
      success: true,
      message: "user signup successful",
      data: {
        user: {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          username: newUser.username,
          email: newUser.email,
        },
        token,
      },
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  login,
  signUp,
};
