import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style.css";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MoviesDetails from "./pages/MoviesDetails";
import MoviesCategory from "./pages/MoviesCategory";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { MoviesProvider } from "./context/MoviesContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/favorites",
    element: (
      <>
        <Header />
        <Favorites />
        <Footer />
      </>
    ),
  },
  {
    path: "/movie/:movieId",
    element: (
      <>
        <Header />
        <MoviesDetails />
        <Footer />
      </>
    ),
  },
  {
    path: "/category/:categoryId",
    element: (
      <>
        <Header />
        <MoviesCategory />
        <Footer />
      </>
    ),
  },
]);

export default function App() {
  return (
    <MoviesProvider>
      <RouterProvider router={router} />
    </MoviesProvider>
  );
}
