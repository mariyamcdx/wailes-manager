import axios from "axios";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";


const useMutationApi = ({
  method,
  endpoint,
  resGetter = (res) => res?.data?.data || res?.data,
  options,
  tenantKey = null,
  showError = true,
  contentType,
  isSignUpCall = false,
  Menu_id,
  retrieveOnMount = false,
}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": contentType || "application/json",
    "X-tenant-id": tenantKey,
    Menu_id,
  };

  if (!isSignUpCall) {
    headers["Authorization"] = `Bearer ${token === null ? "" : token}`;
  }

  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
  } = useMutation({
    mutationFn: (data = {}) => {
      const { dynamicEndpointSuffix, ...apiData } = data;

      return axios({
        url: `${process.env.REACT_APP_BACKEND_URL}${endpoint}${
          dynamicEndpointSuffix || ""
        }`,
        method,
        data: apiData,
        ...options,
        headers,
      });
    },
    enabled: retrieveOnMount,
  });

  useEffect(() => {
    if (showError && error) {
      if (error?.response?.status === 500) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  }, [error, showError]);

  return {
    data: resGetter(data),
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
  };
};

export default useMutationApi;
