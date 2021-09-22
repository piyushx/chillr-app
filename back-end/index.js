const express = require("express");
const app = express();
const connectDB = require("./database");
const authRouter = require("./routers/authRouter");
const postRouter = require("./routers/postRouter");
const engageRouter = require("./routers/engagementRouter");
var cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/engage", engageRouter);

connectDB();

app.listen(5000, ()=> {
    console.log("Server is running on port 5000");
})