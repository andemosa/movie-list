/* eslint-disable @typescript-eslint/no-explicit-any */

import useSWR, { KeyedMutator } from "swr";

interface IProps<T> {
  url: string;
  buildUI: (data: T, mutate?: KeyedMutator<any>) => JSX.Element;
}

const DataFetcher = <T,>({ url, buildUI }: IProps<T>) => {
  const { data, error, isLoading, mutate } = useSWR(url);

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cytric-600 border-solid border-r-transparent"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-8 font-semibold text-red-500 text-lg">
        {error.response?.data?.errorMessage ||
          error.response?.data ||
          "An error occurred. Please try again"}
      </div>
    );

  return buildUI(data, mutate);
};

export default DataFetcher;
