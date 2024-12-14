import dotenv from "dotenv";
import { join } from "path";
import mongoose from "mongoose";

const path = join(__dirname, "..", "config.env");
dotenv.config({ path });

const DB = process.env.DATABASE!.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD!
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

import app from "./app";

const server = app.listen(3000);

process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
