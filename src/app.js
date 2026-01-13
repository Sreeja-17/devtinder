const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./utils/cronjob.js");
const http = require("http");


const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");
const paymentRouter = require("./routes/payment.js");
const initializeSocket = require("./utils/socket.js");
const chatRouter = require("./routes/chat");


const allowedOrigins = [
  "http://localhost:5173",
  "https://devtinder-mvhc.onrender.com",
  "https://devtinder.sreejadev.in"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(
  "/payment/webhook",
  express.raw({ type: "application/json" }),
  paymentRouter
);


app.use(express.json());
app.use(cookieParser());


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);


connectDB()
  .then(() => {
    console.log("Successfully connected to database");
    server.listen(3000, () => {
      console.log(" Server running on port 3000");
    });
  })
  .catch((err) => { console.log("Database cannot be connected" + err); });
