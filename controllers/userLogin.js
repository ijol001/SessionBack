import userModel from "../models/user.js";
import bcrypt from "bcryptjs";

async function userLogin(req, res) {
  try {
    const { email, password} = req.body;
    console.log(email + ", " + password);
    if (email && password) {
      const user = await userModel.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          
          req.session.user = {
            email: user.email
          };
          console.log(req.sessionID);
  
          res.send({ status: "success", message: "Login Success",
          "session": req.sessionID
           });
        } else {
          res.send({ status: "failed", message: "Email or Password is not valid" });
        }
      } else {
        res.send({ status: "failed", message: "You are not a registered user" });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", message: "Unable to Login" });
  }
}

export default userLogin;
