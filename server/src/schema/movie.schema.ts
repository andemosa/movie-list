import { number, object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateMovieSchema:
 *      type: object
 *      required:
 *        - title
 *        - date
 *        - startTime
 *      properties:
 *        title:
 *          type: string
 *          default: Create Wireframe
 *        date:
 *          type: string
 *          default: 2024-03-25
 *        startTime:
 *          type: string
 *          default: 10:30
 *        endTime:
 *          type: string
 *          default: 11:30
 *    CreateMovieResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        title:
 *          type: string
 *        date:
 *          type: string
 *        startTime:
 *          type: string
 *        endTime:
 *          type: string
 *        completed:
 *          type: boolean
 *        startTimeISO:
 *          type: string
 *        endTimeISO:
 *          type: string
 *        user:
 *          type: string
 *    GetMoviesResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *        page:
 *          type: string
 *        limit:
 *          type: string
 *        total:
 *          type: string
 *        Movies:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *              createdAt:
 *                type: string
 *              updatedAt:
 *                type: string
 *              title:
 *                type: string
 *              date:
 *                type: string
 *              startTime:
 *                type: string
 *              endTime:
 *                type: string
 *              completed:
 *                type: boolean
 *              startTimeISO:
 *                type: string
 *              endTimeISO:
 *                type: string
 *              user:
 *                type: string
 *    UpdateMovieResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *        Movie:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 *            title:
 *              type: string
 *            date:
 *              type: string
 *            startTime:
 *              type: string
 *            endTime:
 *              type: string
 *            startTimeISO:
 *              type: string
 *            endTimeISO:
 *              type: string
 *            user:
 *              type: string
 *            completed:
 *              type: boolean
 *    DeleteMovieResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *        message:
 *          type: string
 *          default: Movie has been deleted!
 *
 */
export const CreateMovieSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }).min(1, { message: "Title is required" }),
    poster: string({
      required_error: "Poster is required",
    }).min(1, { message: "Poster is required" }),
    publishedYear: number({
      invalid_type_error: "Published Year must be a number",
      required_error: "Published Year is required",
    }),
  }),
});

export type CreateMovieInput = TypeOf<typeof CreateMovieSchema>;
