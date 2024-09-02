import React, { useEffect } from "react";
import "./App.scss";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { RegisterPage } from "./Pages/RegisterPage/RegisterPage";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { refreshToken } from "./features/auth/authSlice";
import * as authActions from "./features/auth/authSlice";

export const App: React.FC = () => {
  const location = useLocation();
  const login = location.pathname === "/login";
  const register = location.pathname === "/register";
  const dispatch = useAppDispatch();
  const refreshInterval = 1000 * 1000; // 1,000 seconds
  const { user } = useAppSelector((state) => state.auth);

  // eslint-disable-next-line
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        dispatch(refreshToken());
        // console.log("token was refreshed!");
      }, refreshInterval);

      return () => clearInterval(interval);
    }

    if (!user) {
      dispatch(authActions.exit());
    }
  }, [dispatch, refreshInterval, user]);

  if (login) {
    return <LoginPage />;
  }

  if (register) {
    return <RegisterPage />;
  }

  return (
    <>
      <div className="page__container">
        {/* {login || register ? ( */}
        {/* <LoginPage /> */}
        {/* ) : ( */}
        {/* <> */}
        <div className="container">
          <Header />
          <main className="main page__main">
            <Outlet />
          </main>
        </div>
        <Footer />
        {/* </> */}
        {/* )} */}
      </div>
    </>
  );
};
