import { useNavigate } from "react-router-dom";
import { SWRConfig } from "swr";

import { axiosInstance, clearToken } from "./swr";

const CustomSWR = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleError = (error: { response: { status: number } }) => {
    if (error.response && error.response.status === 401) {
      clearToken();
      navigate("/login");
    } else {
      console.log(error);
    }
  };

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        onError: (error) => handleError(error),
        fetcher: (url) => axiosInstance.get(url).then((res) => res.data),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default CustomSWR;
