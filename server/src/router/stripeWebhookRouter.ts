import express from "express";
import { stripeWebhookListener } from "../controllers/stripeWebhookController";

const stripeWebhookRouter = express.Router();

stripeWebhookRouter.route("/").post(stripeWebhookListener);

export default stripeWebhookRouter;
