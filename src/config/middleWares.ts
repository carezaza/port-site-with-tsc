import { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";

export const useMiddleWares = (app: Express) => {
  if (process.env.NODE_ENV === "production") {
    app.use(compression());
  }
  app.use(
    cors({
      // origin: "http://localhost:3000",
      origin: "http://portfolio-care.herokuapp.com",
      credentials: true,
    })
  );
  app.use(cookieParser());
};
