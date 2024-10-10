import express, { NextFunction, Request, Response } from "express";
import mongoSanitize from "express-mongo-sanitize";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./router/userRouter";
import globalErrorHandler from "./controllers/errorController";
import reviewRouter from "./router/reviewRouter";
import productRouter from "./router/productRouter";
import wishlistRouter from "./router/wishlistItemRouter";
import historyRouter from "./router/historyRouter";
import cartRouter from "./router/cartRouter";
import couponRouter from "./router/couponRouter";
import path from "path";
import orderRouter from "./router/orderRouter";
import replyRouter from "./router/replyRouter";
import notificationRouter from "./router/notificationRouter";
import requestRouter from "./router/requestRouter";
import banRouter from "./router/banRouter";
import refundRouter from "./router/refundRouter";
import stripeWebhookRouter from "./router/stripeWebhookRouter";

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

app.use(cors());

app.use(mongoSanitize());

app.use(dayLimiter, hourLimiter);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/user", userRouter);
app.use("/review", reviewRouter);
app.use("/product", productRouter);
app.use("/wishlist", wishlistRouter);
app.use("/history", historyRouter);
app.use("/cart", cartRouter);
app.use("/coupon", couponRouter);
app.use("/order", orderRouter);
app.use("/reply", replyRouter);
app.use("/notification", notificationRouter);
app.use("/request", requestRouter);
app.use("/ban", banRouter);
app.use("/refund", refundRouter);
app.use("/stripe_webhooks", stripeWebhookRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use(globalErrorHandler);

export default app;
