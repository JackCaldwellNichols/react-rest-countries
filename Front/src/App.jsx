import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Register from "./pages/Register";
import { Suspense } from "react";
import Loading from "./pages/Loading";
import { lazy } from "react";

const Profile = React.lazy(() => import("./pages/Profile"));
const Country = lazy(() => import("./pages/Country"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/profile/:username"
            element={
              user ? (
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              ) : (
                <Home />
              )
            }
          />

          <Route
            path="/country/:name"
            element={
              <Suspense fallback={<Loading />}>
                <Country />
              </Suspense>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
