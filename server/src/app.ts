import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./router/userRouter";

const app = express();

app.use(helmet());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());

app.use("/user", userRouter);

export default app;
