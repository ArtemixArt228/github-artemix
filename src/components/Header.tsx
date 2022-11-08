import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

const Header = () => {
  const { countOfFavourites } = useAppSelector((store) => store.githubFav);

  return (
    <header className="w-full bg-white">
      <div className="w-[1200px] flex justify-between items-center h-[70px] m-auto">
        <h1 className="text-black text-2xl font-bold">Artemix Github</h1>
        <div className="flex gap-10 text-black text-lg font-semibold">
          <Link to="/">Home</Link>
          <Link className="relative" to="/favourites">
            Favourites
            <span className="absolute bg-amber-600 w-5 h-5 text-center top-[-1px] right-[-20px] flex justify-center items-center rounded-full">
              {countOfFavourites}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
