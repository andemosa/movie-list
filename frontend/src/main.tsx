import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";

import App from "./App.tsx";
import CustomSWR from "./utils/CustomSWR.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <CustomSWR>
        <App />
      </CustomSWR>
    </Router>
  </StrictMode>
);

declare global {
  interface IMovie {
    _id: string;
    title: string;
    poster: string;
    publishedYear: number;
    user: string;
    createdAt: string;
    updatedAt: string;
  }

  interface IMovieApiResponse {
    success: boolean;
    movies: IMovie[];
    page: number;
    limit: number;
    totalPages: number;
    totalMovies: number;
  }
}
