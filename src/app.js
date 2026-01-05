const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")
require('dotenv').config()
require("./utils/cronjob.js")
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("/", cors());
app.use(cors({
  origin: ["https://devtinder-mvhc.onrender.com"], // your frontend URL
  credentials: true ,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"]
}));
app.use(
  "/payment/webhook",
  express.raw({ type: "application/json" })
);

app.use(express.json());
app.use(cookieParser());




const authRouter = require('./routes/auth.js');
const profileRouter = require('./routes/profile.js');
const requestRouter = require('./routes/request.js');
const userRouter = require('./routes/user.js');
const paymentRouter = require('./routes/payment.js');


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);


connectDB()
    .then(() => {
        console.log("successfully connect to database");
        app.listen(3000, () => {
            console.log("server is successfully on port 3000....")
        });
    })
    .catch((err) => {
        console.log("Database cannot be connected" + err);
    });












