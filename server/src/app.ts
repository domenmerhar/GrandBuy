import express, { Request, Response } from "express";
import mongoSanitize from "express-mongo-sanitize";
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
import path from "path";

//TODO: xss

const hourLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const dayLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 400,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(helmet());

app.use(mongoSanitize());

app.use(dayLimiter);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public", "files")));

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
