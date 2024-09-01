import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./router/userRouter";
import globalErrorHandler from "./controllers/errorController";

const app = express();

app.use(helmet());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());

app.use("/user", userRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use(globalErrorHandler);

export default app;
