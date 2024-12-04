import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";

import { EyeOff, Eye } from "../components/Icons";

import { sendPostRequest, setToken } from "../utils/swr";

const RegisterPage = () => {
  const { trigger } = useSWRMutation(
    "/auth/register",
    sendPostRequest<{ name: string; email: string; password: string }>
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password, loading } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const id = toast.loading("Please wait...");
    setFormData({
      ...formData,
      loading: true,
    });
    try {
      const response = await trigger({
        name,
        email,
        password,
      });
      toast.update(id, {
        render:
          response.data.message ?? "Registered successfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      setToken(response.data?.user?.token)
      navigate("/list");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className="p-8 flex-1 h-full flex justify-center items-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-6">
          Sign up
        </h1>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              className="bg-cytric-500 placeholder:text-white mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none border-cytric-500"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="bg-cytric-500 placeholder:text-white mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none border-cytric-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="bg-cytric-500 placeholder:text-white mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none border-cytric-500 pr-10"
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-cytric-600 text-white font-semibold rounded-md hover:bg-cytric-600 focus:outline-none focus:ring-2 focus:ring-cytric-400 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
        <p className="text-center my-2 text-sm">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-cytric-600">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
