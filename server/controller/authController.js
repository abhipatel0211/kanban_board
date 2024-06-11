// import User from "../models/Usermodal.js";
import User from "../models/usermodal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = "jjklasjdf;lkaj;lsdkjf;laksdjflk;jalskdj";
const bcryptSalt = bcrypt.genSaltSync(10);

export const registerController = async (req, res) => {
  // res.json("inside reg");
  // console.log(req.body);
  const { name, email, password } = req.body;
  // console.log(email);
  try {
    const foundemail = await User.findOne({ email });
    if (foundemail) {
      // console.log("already exist from register");
      res.json("email_already_exist");
    } else {
      const hashpassword = bcrypt.hashSync(password, bcryptSalt);
      const createdUser = await User.create({
        name: name,
        email: email,
        password: hashpassword,
      });
      jwt.sign(
        { userId: createdUser._id, email, name },
        jwtSecret,
        {},
        (err, token) => {
          //takes two things error and tocken but the token
          if (err) {
            throw err;
          }
          // console.log(token);
          res
            .cookie("token", token, {
              // domain: "localhost",
              // path: '/',
              secure: true,
              // httpOnly: true,
              expires: new Date(Date.now() + 5000),
            })
            .status(201)
            .json({
              id: createdUser._id,
              token,
              // email
            });
        }
      );
    }
  } catch (err) {
    if (err) throw err;
    res.status(500).json("error");
  }
};

export const loginController = async (req, res) => {
  console.log("inside login");
  const { email, password } = req.body;
  try {
    const foundemail = await User.findOne({ email });
    if (foundemail) {
      // console.log(email);
      console.log(foundemail);
      const passOk = bcrypt.compareSync(password, foundemail.password);
      // console.log(passOk);
      if (passOk) {
        // console.log(password);
        jwt.sign(
          { userId: foundemail._id, email, name: foundemail.name },
          jwtSecret,
          {},
          (err, token) => {
            //takes two things error and tocken but the token
            if (err) {
              throw err;
            }
            // console.log(token);
            res
              .cookie("token", token, {
                // domain: "localhost",
                path: "/",
                // secure: true,
                // httpOnly: true,
                expires: new Date(Date.now() + 50000),
              })
              .status(201)
              .json({
                id: foundemail._id,
                token,
                // email
              });
          }
        );
      } else {
        // console.log("password wrong ");
        res.json("wrong_password");
      }
    } else {
      // console.log("email not found");
      res.json("no_email");
    }
  } catch (err) {
    console.log(err);
  }
};
