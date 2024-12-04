import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { WavyIcon } from "./components/Icons";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import MovieListPage from "./pages/MovieList";
import MovieFormPage from "./pages/MovieForm";

const App = () => {
  return (
    <div className="min-h-dvh flex justify-between bg-cytric-900 relative text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 w-full">
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<RegisterPage />}></Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/list" element={<MovieListPage />}></Route>
            <Route path="/movies/:id" element={<MovieFormPage />}></Route>
          </Route>

          <Route path="*" element={<Navigate to="/list" replace />} />
        </Routes>
      </div>
      <WavyIcon />
      <ToastContainer />
    </div>
  );
};

export default App;
