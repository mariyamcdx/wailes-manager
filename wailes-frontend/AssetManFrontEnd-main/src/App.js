import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { CommonDataProvider, useCommonData } from "./context/CommonDataProvider";
import { ProtectedRouteContent } from "./layout/ProtectedRouteContent";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
import AppConfig from "./pages/home/AppConfig";
import DataTransfer from "./pages/home/DataTransfer";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { MenuContextProvider } from "./context/MenuContextProvider";
import DBView from "./pages/home/DBView";
import Dashboard from "./pages/Dashboard";
import EditSection from "./pages/home/EditSection";
import Materials from "./pages/home/Materials";
export const routes = [
  {
    route: "/home",
    Component: Dashboard,
    isProtected: true,
  },
  {
    route: "/",
    Component: SignIn,
  },
  {
    route: "/login",
    Component: SignIn,
  },

  // {
  //   route: "/sign-up",
  //   Component: SignUp,
  // },

  {
   route: "/home/dbview",
   Component: DBView,
  isProtected: true },

  {
    route: "/home/app-config",
    Component: AppConfig,
    isProtected: true,
  },

  {
    route: "/home/data-transfer",
    Component: DataTransfer,
    isProtected: true,
  },
  {
    route:"/home/edit-section",
    Component: EditSection,

  },
  {
    route:"/home/materials",
    Component: Materials,
    isProtected: true,
  }
];

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={HTML5Backend}>
          <BrowserRouter>
            <Routes>
              {routes.map(({ route, Component, isProtected = false }) => {
                return (
                  <Route
                    key={route}
                    path={route}
                    element={
                      isProtected ? (
                        <AuthContextProvider>
                          <CommonDataProvider>
                            <MenuContextProvider>
                              <ProtectedRouteContent Component={Component} />
                            </MenuContextProvider>
                          </CommonDataProvider>
                        </AuthContextProvider>
                      ) : (
                        <Component />
                      )
                    }
                  />
                );
              })}
            </Routes>
          </BrowserRouter>
        </DndProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
