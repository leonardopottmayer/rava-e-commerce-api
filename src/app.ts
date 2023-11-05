import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorMiddleware } from "./middleware/error.middleware";
import { appRouter } from "./routes/router";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", appRouter);

app.use(errorMiddleware);

export default app;
