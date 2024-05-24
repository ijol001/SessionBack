import userModel from "../models/user.js";
import bcrypt from "bcrypt";

async function userReg(req, res)  {
  const { first_name, last_name, email, password, password_confirmation} = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      res.status(201).send({ "status": "failed", "message": "Email already exists" });
      return;
    }
    if (!first_name || !last_name || !email || !password || !password_confirmation ) {
      res.send({ "status": "failed", "message": "All fields are required" });
      return;
    }
    if (password !== password_confirmation) {
      res.send({ "status": "failed", "message": "Password and Confirm Password do not match" });
      return;
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

    req.session.user = {
      id: newUser.id, 
      email: newUser.email,
    };

     res.status(200).send({
      "status": "success", "message": "Registration successful",
      "user": req.session.user 
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ "status": "failed", "message": "Unable to register" });
  }
};

export default userReg;
