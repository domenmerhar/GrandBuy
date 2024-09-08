import express, { Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./router/userRouter";
import globalErrorHandler from "./controllers/errorController";
import reviewRouter from "./router/reviewRouter";
import productRouter from "./router/productRouter";
import wishlistRouter from "./router/wishlistItemRouter";
import historyRouter from "./router/historyRouter";
import cartRouter from "./router/cartRouter";
import couponRouter from "./router/couponRouter";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const app = express();

app.use(helmet());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(limiter);

app.use(express.json());

app.use("/user", userRouter);
app.use("/review", reviewRouter);
app.use("/product", productRouter);
app.use("/wishlist", wishlistRouter);
app.use("/history", historyRouter);
app.use("/cart", cartRouter);
app.use("/coupon", couponRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use(globalErrorHandler);

export default app;
