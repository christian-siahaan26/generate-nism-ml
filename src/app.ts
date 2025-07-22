import cors from "cors";
import express, { NextFunction, Response, Request } from "express";
import createError, { HttpError } from "http-errors";
import logger from "morgan";
import userRouter from "../src/routes/user.route"
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

// routes
app.use("/api/users", userRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response, _next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send error response
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
