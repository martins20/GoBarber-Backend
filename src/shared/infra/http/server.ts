import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import routes from "./routes";
import uploadConfig from "../../../config/upload";
import AppError from "../../errors/AppError";
import cors from "cors";

import "../typeorm";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

// Tratamento de erros
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 500,
    message: "Internal server error",
  });
});

app.listen(3333, () => {
  console.log("Server started on port 3333!");
});
