import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import * as dotenv from "dotenv";
import router from "./routes/testRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();
const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
};

const startServer = () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log("Server is running on " + port + "port");
  });
};

const loadRoutes = () => {
  app.use("/api", router);
  app.use("/api/users", userRouter);
};

// console.log(process.env.MONGO_DB);

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("connection with MongoDB established");
  } catch (error) {
    console.log("error", error);
  }
};

const runServer = async () => {
  await DBConnection(), addMiddlewares(), startServer(), loadRoutes();
};

runServer();

//몽고디비랑 연결, 미들웨어 익스프레스라이브러리 호출, 서버돌리기 포트 열어서, 루트실행
// await mongoose.connect();
