import express from "express";

import { verifyToken } from "../middleware/jwt";
import validate from "../middleware/validateResource";
import movieController from "../controllers/movie.controller";
import { CreateMovieSchema } from "../schema/movie.schema";

/**
 * @openapi
 * tags:
 *   name: Movie
 *   description: The Movie API provides endpoints for managing movies, including creating, updating, retrieving, and deleting user's movies.
 */
const movieRouter = express.Router();

/**
 * @openapi
 * '/api/movies':
 *  post:
 *    tags: [Movie]
 *    summary: Create a Movie
 *    description: This endpoint is used when a user wants to create a Movie.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateMovieschema'
 *    responses:
 *      201:
 *        description: Movie created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateMovieResponse'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict
 */
movieRouter.post(
  "/",
  verifyToken,
  validate(CreateMovieSchema),
  movieController.createMovie
);

/**
 * @openapi
 * '/api/movies':
 *  get:
 *    tags: [Movie]
 *    summary: Return a list of movies
 *    description: This endpoint is used to return a list of movies. It accepts query filters.
 *    parameters:
 *      - in: query
 *        name: date
 *        schema:
 *          type: string
 *          default: 2024-03-25
 *        description: The date for which asks should be gotten
 *      - in: query
 *        name: limit
 *        schema:
 *          type: number
 *          default: 10
 *        description: The number of movies shown per page
 *      - in: query
 *        name: page
 *        schema:
 *          type: number
 *          default: 1
 *        description: The current page
 *    responses:
 *      200:
 *        description: Returns a list of movies for the user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetmoviesResponse'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Conflict
 */
movieRouter.get("/", verifyToken, movieController.getMovies);

/**
 * @openapi
 * '/api/movies/{MovieId}':
 *  patch:
 *    tags: [Movie]
 *    summary: Update a Movie
 *    description: This endpoint is used when a user wants to update a Movie.
 *    parameters:
 *     - name: MovieId
 *       in: path
 *       description: The id of the Movie
 *       required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateMovieschema'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateMovieResponse'
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Movie not found
 *  delete:
 *    tags: [Movie]
 *    summary: Delete a Movie
 *    description: This endpoint is used when a user wants to delete a Movie.
 *    parameters:
 *     - name: MovieId
 *       in: path
 *       description: The id of the Movie
 *       required: true
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DeleteMovieResponse'
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Movie not found
 */

movieRouter.patch("/:id", verifyToken, movieController.updateMovie);
movieRouter.get("/:id", verifyToken, movieController.getMovieById);
movieRouter.delete("/:id", verifyToken, movieController.deleteMovie);

export default movieRouter;
