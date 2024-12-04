import { Model, Schema, Types, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IMovie {
  title: string;
  publishedYear: number
  poster: string;
  user: Types.ObjectId;
  _doc: Omit<this, "_doc">;
}

interface MovieModel extends Model<IMovie> {}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IMovie, MovieModel>(
  {
    title: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
const Movie = model<IMovie, MovieModel>("Movie", schema);

export { Movie, IMovie };
