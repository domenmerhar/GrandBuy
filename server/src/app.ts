import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./router/userRouter";
import globalErrorHandler from "./controllers/errorController";

const app = express();

app.use(helmet());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());

app.use("/user", userRouter);

app.use(globalErrorHandler);

export default app;
