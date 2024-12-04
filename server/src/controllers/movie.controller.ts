import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

import createError from "../utils/createError";
import { CreateMovieInput } from "../schema/movie.schema";
import { Movie } from "../models/movie.model";

dotenv.config();
const TEST_USER_ID = process.env.TEST_USER_ID || "";

interface IQuery {
  limit?: number;
  page?: number;
}

const createMovie = async (
  req: Request<{}, {}, CreateMovieInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  const newMovie = new Movie({
    user: res.locals.userId,
    ...req.body,
  });

  try {
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) next(createError(404, 5, "Movie not found!"));

    if (movie && movie.user.toString() !== res.locals.userId)
      return next(createError(403, 3, "You can delete only your movies!"));

    if (res.locals.userId === TEST_USER_ID)
      return next(createError(403, 3, "Test user cannot delete movies"));

    await Movie.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Movie has been deleted!",
    });
  } catch (err) {
    next(err);
  }
};

const getMovies = async (
  req: Request<{}, {}, {}, IQuery>,
  res: Response,
  next: NextFunction
) => {
  const { page = 1, limit = 8 } = req.query;

  const filters = {
    user: res.locals.userId,
  };

  try {
    const movies = Movie.find(filters)
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .sort({ createdAt: -1 });

    const total = Movie.countDocuments(filters);

    const result = await Promise.all([movies, total]);

    res.status(200).json({
      success: true,
      page,
      limit,
      movies: result[0],
      totalMovies: result[1],
      totalPages: Math.ceil(result[1] / limit),
    });
  } catch (err) {
    next(err);
  }
};

const updateMovie = async (
  req: Request<{ id: string }, {}, Partial<CreateMovieInput["body"]>, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) next(createError(404, 5, "Movie not found!"));

    if (movie && movie.user.toString() !== res.locals.userId)
      return next(createError(403, 3, "You can only edit your movies!"));

    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      movie: updatedMovie,
    });
  } catch (err) {
    next(err);
  }
};

const getMovieById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) next(createError(404, 5, "Movie not found!"));

    if (movie && movie.user.toString() !== res.locals.userId)
      return next(createError(403, 3, "You can only view your movies!"));

    res.status(200).json({
      success: true,
      movie,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
