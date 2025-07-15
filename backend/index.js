// index.js
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import courseRouter from "./routes/course.routes.js";
import lessonRouter from "./routes/lesson.route.js";
import paymentRouter from "./routes/payment.routes.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(errorMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/lesson", lessonRouter);
app.use("/api/v1/payment", paymentRouter);

