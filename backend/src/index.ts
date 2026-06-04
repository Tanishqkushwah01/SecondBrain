import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.router.js";
import shareRouter from "./routes/share.router.js";
import databaseCall from "./models/connection.js";


const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
console.log("url:",process.env.CLIENT_URL);

app.use("/auth",userRouter);
app.use("/share",shareRouter);

databaseCall();

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
    console.log(process.env.PORT,"all is well");
});
