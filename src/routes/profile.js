const express=require ("express");
const profileRouter= express.Router();
const {userAuth}= require("../middlewares/auth");
const User= require("../models/user");
const jwt = require('jsonwebtoken');
const { validateEditProfileData } = require("../utils/validation");


profileRouter.get("/profile/view",userAuth, async (req, res) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            throw new Error("Session expired. Login again")
        }
        const decodedMessage = jwt.verify(token, "Devtinder@123");
        const { _id } = decodedMessage;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User does not exist");
        }
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }
})


profileRouter.patch("/profile/edit",userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


module.exports=profileRouter;