import { Link, useNavigate } from "react-router-dom";

import { PlusIcon, LogoutIcon } from "./Icons";
import Pagination from "./Pagination";

import { clearToken } from "../utils/swr";

const MovieListDisplay = ({
  movieData,
  currPage,
  setCurrPage,
}: {
  movieData: IMovieApiResponse;
  currPage: number;
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const navigate = useNavigate();

  const movies = movieData.movies;

  return (
    <div className="py-6 md:py-10 lg:py-14 mb-32 px-2 md:px-8 lg:px-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold flex items-center gap-4">
          My Movies&nbsp;
          <span className="cursor-pointer">
            <Link to={"/movies/new"}>
              <PlusIcon />
            </Link>
          </span>
        </h1>
        <button
          className="flex items-center gap-2"
          onClick={() => {
            clearToken();
            navigate("/login");
          }}
        >
          <span className="hidden sm:inline">Logout</span> <LogoutIcon />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie._id}`}
            key={movie._id}
            className="bg-cytric-800 rounded-lg overflow-hidden shadow-md text-white md:p-2"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-72 lg:h-96 rounded-md w-full object-cover"
            />
            <div className="p-3 space-y-2">
              <h3 className="md:text-lg lg:text-xl font-medium">
                {movie.title}
              </h3>
              <p className="text-sm">{movie.publishedYear}</p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={currPage}
        totalPages={movieData.totalPages}
        onPageChange={setCurrPage}
      />
    </div>
  );
};

export default MovieListDisplay;
