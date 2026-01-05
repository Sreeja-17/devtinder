const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config();
require("./utils/cronjob.js")



// 1. Unified CORS Configuration
const allowedOrigins = ["http://localhost:5173", "https://devtinder-mvhc.onrender.com"];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// 2. Webhook Route (MUST be before express.json())
app.post(
    "/payment/webhook",
    express.raw({ type: "application/json" }), // Captures raw body for signature check
    require('./routes/payment.js') // Pointing to your webhook handler
);

app.options("/", cors());

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












