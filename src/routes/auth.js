const express= require("express");
const authRouter=express.Router();

const {validateSignUp}=require("../utils/validation");
const bcrypt=require("bcrypt");
const User= require("../models/user")


authRouter.post("/signup", async (req, res) => {

    try {
        validateSignUp(req);
        const { password, firstName, lastName, emailId, gender, photoUrl, age } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName, emailId, gender, photoUrl, age,
            password: passwordHash
        });
        const savedUser=await user.save();
        const token = await user.getJWT();

            res.cookie("token", token);
        res.json({message:"User added successully ",data:savedUser});

    } catch (err) {
        res.status(400).send("Error:" + err.message);

    }
})


authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials")
        }

        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT();

            res.cookie("token", token);
            res.json({
                message: "Logged In Successfully",
                data:user
            });
        } else {
            throw new Error("Password Invalid");
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);

    }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
});

module.exports=authRouter;
