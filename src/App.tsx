import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FavouritesPage from "./pages/FavouritesPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </>
  );
}

export default App;
