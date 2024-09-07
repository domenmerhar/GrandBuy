import express from "express";
import { getHistory } from "../controllers/historyItemController";
import { protect } from "../controllers/authController";

const historyRouter = express.Router();

historyRouter.route("/").get(protect, getHistory);

export default historyRouter;
