const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const ALLOWED_DATA = ["firstName", "lastName", "age", "skills", "gender","photoUrl","about"];
const User = require("../models/user")
userRouter.get("/user/request/received",
    userAuth,
    async (req, res) => {
        //get all the pending request for loggedinuser
        try {

            const loggedInUser = req.user;
            const connectionRequest = await ConnectionRequest.find({
                toUserId: loggedInUser._id,
                status: "interested"
            }).populate("fromUserId", ALLOWED_DATA)

            if (!connectionRequest) {
                return res.json({
                    message: "No connections found"
                })
            }
            res.json({ message: "Data fetched successfully", data: connectionRequest });

        } catch (err) {
            res.status(400).send("ERROR " + err.message);
        }
    });
userRouter.get("/user/view/connections", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser, status: "accepted" },
                { fromUserId: loggedInUser, status: "accepted" },

            ]
        }).populate("fromUserId", ALLOWED_DATA).populate("toUserId", ALLOWED_DATA);
        const data = connectionRequest.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        })
        if (!connectionRequest) {
            return res.json({ message: "No connections found" })
        }
        res.json({ data });
    } catch (err) {
        res.status(400).send("ERROR " + err.message)

    }
})
userRouter.get("/feed", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        const skip=(page-1)*limit;
        limit=limit>50?50:limit;
        const connectedRequest = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser }, { toUserId: loggedInUser }]
        })

        const hideUsersFromFeed = new Set();
        connectedRequest.forEach((req) => {
            hideUsersFromFeed.add((req.fromUserId).toString());
            hideUsersFromFeed.add((req.toUserId).toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser } },
            ],
        }).select(ALLOWED_DATA).skip(skip).limit(limit);

        res.send(users)
    } catch (err) {
        res.status(400).send("ERROR " + err.message)

    }
})
module.exports = userRouter;

