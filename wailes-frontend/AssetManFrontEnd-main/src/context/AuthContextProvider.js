import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchApi from "../hooks/useFetchApi";
import { Progressor } from "../common/Progressor";
import { ListGroupPrefix } from "../constants/global";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState();
  const navigate = useNavigate();

  const {
    data: userData,
    refetch: refetchUser,
    isError,
    isFetching: isUserFetching,
  } = useFetchApi({
    endpoint: `${ListGroupPrefix}/me`,
    retrieveOnMount: true,
    retry: 0,
    Menu_id: -1,
  });

  useEffect(() => {
    if (isError) {
        navigate("/login");
    }
}, [isError, navigate]);

  if (!userData) {
    return <Progressor />;
  }

  return (
    <AuthContext.Provider
      value={{
        selectedMenuItem,
        setSelectedMenuItem,
        userData,
        refetchUser,
        isUserFetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
