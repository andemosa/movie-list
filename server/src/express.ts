import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import authRouter from "./routes/auth.route";
import movieRouter from "./routes/movie.route";

import { errorHandler } from "./middleware/errorhandler";
import { invalidRouteHandler } from "./middleware/norouteHandler";

import { version, author } from "../package.json";

const app = express();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie List API Docs",
      description: "API documentation for Movie List",
      version,
      contact: author,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.resolve(__dirname, "routes", "*.route.ts"),
    path.resolve(__dirname, "schema", "*.schema.ts"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5174", ""],
  })
);

// mount routes
app.use("/api/auth", authRouter);
app.use("/api/movies", movieRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_, res) => {
  res.send("Welcome to MOVIE LIST API");
});

app.use(errorHandler);

//If no route is matched by now, it must be a 404
app.use(invalidRouteHandler);

export default app;
