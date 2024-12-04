import { Link } from "react-router-dom";

const EmptyListDisplay = () => {
  return (
    <div className="p-8 flex-1 h-full flex justify-center items-center">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-6">
          Your movie list is empty
        </h1>
        <Link
          to={"/movies/new"}
          className=" py-2 px-4 md:px-8 bg-cytric-600 text-white font-semibold rounded-md hover:bg-cytric-600 focus:outline-none focus:ring-2 focus:ring-cytric-400 flex items-center justify-center md:max-w-max"
        >
          Add a new movie
        </Link>
      </div>
    </div>
  );
};

export default EmptyListDisplay;
