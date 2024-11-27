import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userAuth from "./routes/users.route.js";
import taskRoute from "./routes/tasks.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./utils/connectDB.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
connectDB();

const _dirname = path.resolve();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", userAuth);
app.use("/api/v2", taskRoute);
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});
