import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import "./App.css";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Artists = lazy(() => import("./pages/Artists"));
const Releases = lazy(() => import("./pages/Releases"));
const User = lazy(() => import("./pages/User"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute, { FullPage } from "./ui/ProtectedRoute";
import ProtectedLogin from "./ui/ProtectedLogin";
import { LoaderOverlay } from "./ui/LoaderOverlay";
import Spinner from "./ui/Spinner";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Suspense
          fallback={
            <FullPage>
              <Spinner />
            </FullPage>
          }
        >
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/releases" element={<Releases />} />
              <Route path="/user" element={<User />} />
            </Route>
            <Route
              element={
                <ProtectedLogin>
                  <Outlet />
                </ProtectedLogin>
              }
            >
              <Route path="/login" element={<Login />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px", zIndex: 10000 }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              backgroundColor: "var(--color-grey-0)",
              color: "green",
              border: "1px solid var(--color-green-300)",
            },
          },
          error: {
            duration: 5000,
            style: {
              backgroundColor: "var(--color-red-100)",
              color: "red",
              border: "1px solid var(--color-red-300)",
            },
          },
          loading: {
            style: {
              backgroundColor: "var(--color-grey-0)",
              color: "white",
              border: "1px solid var(--color-grey-300)",
            },
          },
        }}
      />
      <LoaderOverlay />
    </>
  );
}

export default App;
