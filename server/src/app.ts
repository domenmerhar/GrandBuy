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
import Stripe from "stripe";
import catchAsync from "./utils/catchAsync";
import orderModel from "./models/orderModel";
import cartItemModel from "./models/cartItemModel";
import AppError from "./utils/AppError";
import productModel from "./models/productModel";

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

app.post(
  "/stripe_webhooks",
  catchAsync(
    async (request: Request, response: Response, next: NextFunction) => {
      //TODO: CONFIGURE STRIPPE ON RELEASE
      const event = request.body;

      const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

      console.log(event.type);

      // Handle the event
      switch (event.type) {
        case "checkout.session.completed":
          console.log("Payment was successful!");
          const checkout = await stripe.checkout.sessions.retrieve(
            event.data.object.id
          );

          const orderId = checkout.client_reference_id;
          const order = await orderModel
            .findByIdAndUpdate(orderId, {
              paid: true,
            })
            .populate("products");

          if (!order?.products.length) {
            console.error("No products found in order.");
            return response.json({ received: false });
          }

          await cartItemModel.updateMany(
            { _id: { $in: order?.products } },
            { ordered: true }
          );

          await Promise.all(
            order?.products.map((item) =>
              productModel.findByIdAndUpdate(item.product, {
                $inc: { orders: item.quantity },
              })
            )
          );

          console.log({ order });

          break;

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a response to acknowledge receipt of the event
      response.json({ received: true });
    }
  )
);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use(globalErrorHandler);

export default app;
