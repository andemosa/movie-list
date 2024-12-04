/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";

import { Trash, UploadIcon } from "../components/Icons";
import DataFetcher from "../components/DataFetcher";
import DelayedActionButton from "../components/DelayedActionButton";

import uploadImage from "../utils/upload";
import {
  sendPostRequest,
  sendPatchRequest,
  sendDeleteRequest,
} from "../utils/swr";

interface IFormData {
  title?: string;
  year?: string | number;
  poster?: string;
  image?: File | null;
  loading: boolean;
}

interface IPayload {
  title?: string;
  year?: number;
  poster?: string;
}

const MovieFormPage = () => {
  const { id } = useParams();

  const isNew = id === "new";

  if (isNew) return <MovieFormPageDisplay isNew />;

  return (
    <DataFetcher<{ movie: IMovie }>
      url={`/movies/${id}`}
      buildUI={(data) => <MovieFormPageDisplay movie={data.movie} />}
    />
  );
};

const MovieFormPageDisplay = ({
  movie,
  isNew,
}: {
  movie?: IMovie;
  isNew?: boolean;
}) => {
  const { trigger: postTrigger } = useSWRMutation(
    "/movies",
    sendPostRequest<IPayload>
  );

  const { trigger: patchTrigger } = useSWRMutation(
    `/movies/${movie?._id}`,
    sendPatchRequest<IPayload>
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IFormData>({
    title: movie?.title ?? "",
    year: movie?.publishedYear ?? "",
    poster: movie?.poster ?? "",
    loading: false,
  });
  const { trigger } = useSWRMutation(
    `/movies/${movie?._id}`,
    sendDeleteRequest
  );
  const [delLoading, setDelLoading] = useState(false);

  const { title, year, poster, loading } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (files && files[0]) {
        setFormData({
          ...formData,
          image: files[0],
          poster: files[0] && URL.createObjectURL(files[0]),
        });
      } else {
        setFormData({
          ...formData,
          poster: formData.poster,
          image: files && files[0],
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const onDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const id = toast.loading("Please wait...");
    setDelLoading(true);

    try {
      const response = await trigger();

      toast.update(id, {
        render: response.data.message ?? "Saved",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      setDelLoading(false);
      navigate("/list");
    } catch (error: any) {
      console.log(error);
      toast.update(id, {
        render:
          error.response?.data?.errorMessage ??
          "An error occurred. Please try again",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      setDelLoading(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const id = toast.loading("Please wait...");
    setFormData({
      ...formData,
      loading: true,
    });

    try {
      let payload: IPayload = {
        ...(title && { title }),
        ...(year && { publishedYear: +year }),
        ...(poster && { poster }),
      };

      if (formData.image) {
        const { data } = await uploadImage(formData.image!);
        const { url } = data;
        payload = {
          ...payload,
          poster: url,
        };
      }

      let response;

      if (isNew) {
        response = await postTrigger(payload);
      } else {
        response = await patchTrigger(payload);
      }

      toast.update(id, {
        render: response.data.message ?? "Saved",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      navigate("/list");
    } catch (error: any) {
      console.log(error);
      toast.update(id, {
        render:
          error.response?.data?.errorMessage ??
          "An error occurred. Please try again",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      setFormData({
        ...formData,
        loading: false,
      });
    }
  };

  return (
    <div className="py-6 md:py-10 lg:py-14 mb-32 px-2 md:px-8 lg:px-16">
      <div className="flex justify-between items-center md:w-[80%] lg:w-[70%]">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold flex items-center gap-4">
          {isNew ? "Create a new movie" : "Edit"}
        </h1>
        {isNew ? null : (
          <DelayedActionButton
            clickAction={onDelete}
            isBusy={delLoading}
            text={<Trash className="h-5 w-5 text-red-500" />}
            confirmText="Confirm Delete"
            className="text-red-500 font-medium text-lg"
          />
        )}
      </div>
      <form
        className="grid gap-6 md:gap-y-14 md:gap-x-12 lg:gap-x-16 md:grid-cols-2 md:w-[80%] lg:w-[70%] mt-6 md:mt-10 lg:mt-14"
        onSubmit={onSubmit}
      >
        <div className="md:col-start-2 space-y-2 md:space-y-4">
          <div>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              className="bg-cytric-500 placeholder:text-white mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none border-cytric-500"
              placeholder="Title"
              required
            />
          </div>
          <div>
            <input
              type="number"
              id="year"
              name="year"
              value={year}
              onChange={handleChange}
              className="bg-cytric-500 placeholder:text-white mt-1 block px-4 py-2 border rounded-md shadow-sm focus:outline-none border-cytric-500 w-full md:w-1/2"
              placeholder="Publish year"
              min={0}
              required
            />
          </div>
        </div>

        <div className="bg-cytric-500 border-dashed border-2 rounded-lg flex flex-col gap-2 items-center justify-center p-4 md:col-start-1 md:row-start-1 md:row-end-4 min-h-40 md:min-h-80 relative">
          {poster ? (
            <img src={poster} alt="user" className="w-full h-full" />
          ) : (
            <label
              htmlFor="poster"
              className="flex flex-col justify-center items-center gap-2 flex-1 w-full"
            >
              <input
                type="file"
                name="poster"
                id="poster"
                className="hidden"
                onChange={handleChange}
              />
              <UploadIcon />
              <p>Drop an image here</p>
            </label>
          )}
        </div>

        <div className="md:col-start-2 flex gap-4 md:gap-6 lg:gap-8">
          <button
            type="button"
            disabled={loading}
            className="w-full py-2 px-4 font-semibold rounded-md border border-white flex items-center justify-center"
          >
            <Link to={"/list"} className="w-full">
              Cancel
            </Link>
          </button>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-cytric-600 text-white font-semibold rounded-md border border-cytric-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : isNew ? "Submit" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieFormPage;
