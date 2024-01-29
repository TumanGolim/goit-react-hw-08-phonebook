import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { profileSelector } from "./store/auth/selectors";
import { refreshThunk } from "./store/auth/thunks";
import PublicRoute from "./guards/PublicRoute";
import Loader from "./components/Loader";

const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const TodoPage = lazy(() => import("./pages/TodoPage"));
const TodoDetailsPage = lazy(() => import("./pages/TodoDetailsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));

const App = () => {
  const profile = useSelector(profileSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    !profile && dispatch(refreshThunk());
  }, [dispatch, profile]);

  const isAuthenticated = !!profile;

  return (
    <>
      <Loader />
      <Suspense fallback={<>loading...</>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />

            {isAuthenticated ? (
              <Route path="todo" element={<TodoPage />} />
            ) : (
              <Route
                path="todo"
                element={<Navigate to="/registration" replace />}
              />
            )}

            <Route
              path="products/:productId"
              element={<ProductDetailsPage />}
            />

            {isAuthenticated ? (
              <Route path="todo/:todoId" element={<TodoDetailsPage />} />
            ) : (
              <Route
                path="todo/:todoId"
                element={<Navigate to="/registration" replace />}
              />
            )}
          </Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/registration"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
