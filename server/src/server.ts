import dotenv from "dotenv";
import path from "path";

const path2 = path.join(__dirname, "..", "config.env");

dotenv.config({ path: path2 });

import app from "./app";

app.listen(3000);
