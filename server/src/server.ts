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

app.listen(3000);
