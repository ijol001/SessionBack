import userModel from "../models/user.js";
import bcrypt from "bcryptjs";


async function userReg(req, res) {

  const { first_name, last_name, email, password, password_confirmation, captcha } = req.body;
  try {

    
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(201).send({ "status": "failed", "message": "Email already exists" });
    }

    if (!first_name || !last_name || !email || !password || !password_confirmation || !captcha) {
      return res.status(400).send({ "status": "failed", "message": "All fields are required" });
    }

    if (password !== password_confirmation) {
      return res.status(400).send({ "status": "failed", "message": "Password and Confirm Password do not match" });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashPassword,
    });

    await newUser.save();

    return res.status(200).send({
      "status": "success", "message": "Registration successful",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ "status": "failed", "message": "Unable to register" });
  }
}

export default userReg;
