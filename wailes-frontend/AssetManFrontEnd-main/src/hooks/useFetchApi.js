import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";



const useFetchApi = ({
  endpoint,
  resGetter = (res) => res?.data,
  retrieveOnMount = false,
  storageType = localStorage,
  options,
  retry = 2,
  Menu_id,
  isApps,
}) => {
  const token = `Bearer ${localStorage.getItem("token")}`;
  const headers = {
    Authorization: !isApps ? token : null,
    Menu_id,
  };
  console.log("REACT_APP_BACKEND_URL:", process.env.REACT_APP_BACKEND_URL);
  console.log("Endpoint:", endpoint);
  const {
    data,
    error,
    failureCount,
    isError,
    isFetchedAfterMount,
    isFetching,
    isIdle,
    isLoading,
    isPreviousData,
    isStale,
    isSuccess,
    refetch,
    remove,
    status,
  } = useQuery({
    queryKey: [`${process.env.REACT_APP_BACKEND_URL}${endpoint}`],
    queryFn: () => {
      return axios.get(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
        ...options,
        headers,
      });
    },
    enabled: retrieveOnMount,
    refetchOnWindowFocus: false,
    retry,
  });
  // x-tenant-id
  useEffect(() => {
    if (error) {
      if (
        error?.response?.data?.statusCode === 401 ||
        error?.message === "Network Error"
      ) {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
        toast.error("Please login to continue");
        return setTimeout(() => {
          window.location.replace("/login");
        }, 500);
      }
    }
  }, [error]);
  return {
    data: resGetter(data),
    error,
    loading: isLoading,
    refetch,
    failureCount,
    isPreviousData,
    isError,
    isFetchedAfterMount,
    isFetching,
    isIdle,
    isStale,
    isSuccess,
    remove,
    status,
    refetchInterval: 1000,
  };
};
export default useFetchApi;
