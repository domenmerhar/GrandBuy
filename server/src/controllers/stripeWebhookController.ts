import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { stripe } from "../utils/stripe";
import Order from "../models/orderModel";
import Cart from "../models/cartItemModel";
import Product from "../models/productModel";

export const stripeWebhookListener = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    // TODO: CONFIGURE STRIPE ON RELEASE
    const event = request.body;

    switch (event.type) {
      case "checkout.session.completed":
        const result = await handleCheckoutSessionCompleted(event);
        if (!result.success) {
          return response.json({ received: true });
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.json({ received: true });
  }
);

const handleCheckoutSessionCompleted = async (event: any) => {
  const checkout = await stripe.checkout.sessions.retrieve(
    event.data.object.id
  );

  const orderId = checkout.client_reference_id;
  const order = await Order.findByIdAndUpdate(orderId, {
    paid: true,
  }).populate("products");

  if (!order?.products.length) {
    console.error("No products found in order.");
    return { success: false };
  }

  await Cart.updateMany({ _id: { $in: order?.products } }, { ordered: true });

  await Promise.all(
    order?.products.map((item) =>
      Product.findByIdAndUpdate(item.product, {
        $inc: { orders: item.quantity },
      })
    )
  );

  return { success: true };
};
