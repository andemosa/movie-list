import { useState } from "react";
import useSWR from "swr";

import EmptyListDisplay from "../components/EmptyList";
import MovieListDisplay from "../components/ListDisplay";

import { axiosInstance } from "../utils/swr";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const BASE_URL = "/movies";

const MovieListPage = () => {
  const [currPage, setCurrPage] = useState(1);

  const params: URLSearchParams = new URLSearchParams();

  if (currPage) {
    params.append("page", currPage.toString());
  }

  const url = `${BASE_URL}?${params.toString()}`;

  const { data, isLoading, error } = useSWR<IMovieApiResponse>(url, fetcher);

  if (error)
    return (
      <div className="text-center mt-8 font-semibold text-red-500 text-lg">
        {error.response?.data?.errorMessage ||
          error.response?.data ||
          "An error occurred. Please try again"}
      </div>
    );

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cytric-600 border-solid border-r-transparent"></div>
      </div>
    );

  const totalMovies = data?.totalMovies;

  if (!totalMovies) return <EmptyListDisplay />;

  return (
    <MovieListDisplay
      movieData={data}
      currPage={currPage}
      setCurrPage={setCurrPage}
    />
  );
};

export default MovieListPage;
