import React from "react";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/actions";

const FavouritesPage = () => {
  const { favouritesCoder, favouritesProjects } = useAppSelector(
    (store) => store.githubFav
  );

  const { removeAll } = useActions();

  return (
    <div className="grid grid-cols-2 my-4 min-h-full">
      <div className="border-r-indigo-500 border-r-2 w-full flex flex-col items-center">
        <h3 className="text-black text-2xl font-bold text-gray-100">
          Favourite Projects
        </h3>
        {favouritesProjects.length === 0 ? (
          <div>No favourites projects now</div>
        ) : (
          <div>
            {favouritesProjects.map((project) => (
              <div
                className="my-4 bg-white text-black p-3 rounded-2xl"
                key={project.project_url}
              >
                <p className="text-xl font-semibold">{project.project_name}</p>
                <a href={project.project_url} target="_blank">
                  {project.project_url}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-black text-2xl font-bold text-gray-100">
          Favourite Coders
        </h3>
        {favouritesCoder.length === 0 ? (
          <div>No favourites coder now</div>
        ) : (
          <div>
            {favouritesCoder.map((coder) => (
              <div
                key={coder.id}
                className="w-[400px] flex justify-between h-[70px] items-center bg-amber-100 p-2 rounded-2xl my-4"
              >
                <p className="font-bold text-lg text-black">
                  {coder.coder_name}
                </p>
                <img
                  className="h-full rounded-full"
                  src={coder.coder_image}
                  alt="Coder Image"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="fixed bottom-4 right-4 bg-amber-600 p-3 rounded-2xl cursor-pointer"
        onClick={removeAll}
      >
        Remove All
      </div>
    </div>
  );
};

export default FavouritesPage;
