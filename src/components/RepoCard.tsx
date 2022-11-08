import React, { useEffect, useState } from "react";

import { IRepo } from "../models/repos";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { favouritesCoder, favouritesProjects } = useAppSelector(
    (store) => store.githubFav
  );

  const [isFavCoder, setIsFavCoder] = useState(
    favouritesCoder.map((coder) => coder.id).includes(repo.owner.id)
  );
  const [isFavProject, setIsFavProject] = useState(
    favouritesProjects
      .map((project) => project.project_url)
      .includes(repo.html_url)
  );

  const {
    addFavouritesCoder,
    addFavouritesProject,
    removeFavouritesCoder,
    removeFavouritesProject,
  } = useActions();

  const addFavCoder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (favouritesCoder.map((coder) => coder.id).includes(repo.owner.id)) {
      return;
    }

    addFavouritesCoder({
      id: repo.owner.id,
      coder_image: repo.owner.avatar_url,
      coder_name: repo.owner.login,
    });

    setIsFavCoder(true);
  };

  const addFavProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    addFavouritesProject({
      project_name: repo.full_name,
      project_url: repo.html_url,
    });

    setIsFavProject(true);
  };

  const removeFavCoder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!favouritesCoder.map((coder) => coder.id).includes(repo.owner.id)) {
      return;
    }
    removeFavouritesCoder(repo.owner.id);

    setIsFavCoder(false);
  };

  const removeFavProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    removeFavouritesProject(repo.html_url);

    setIsFavProject(false);
  };

  return (
    <div className="bg-amber-50 my-3 p-5 w-[700px] rounded text-amber-900">
      <div className="flex justify-between">
        <div className="w-[60%]">
          <a
            href={repo.html_url}
            target="_blank"
            className="text-2xl text-amber-900"
          >
            {repo.full_name}
          </a>
          <div className="my-4">
            {repo.language && (
              <p className="text-black">Language: {repo.language}</p>
            )}
          </div>
          {repo.description && <p className="text-black">{repo.description}</p>}
          <div className="flex gap-16 mt-5">
            <p>Forks: {repo.forks}</p>
            <p>Watched: {repo.watchers}</p>
          </div>
          <div className="mt-7 flex gap-6">
            {!isFavCoder && (
              <button
                className="bg-black p-3 rounded text-white hover:border-black hover:text-black hover:bg-transparent border-2"
                type="button"
                onClick={addFavCoder}
              >
                Add Coder
              </button>
            )}
            {isFavCoder && (
              <button
                className="bg-red-900 p-3 rounded text-white hover:border-black hover:text-black hover:bg-transparent border-2"
                type="button"
                onClick={removeFavCoder}
              >
                Remove Coder
              </button>
            )}
            {!isFavProject && (
              <button
                className="bg-black p-3 rounded text-white hover:border-black hover:text-black hover:bg-transparent border-2"
                type="button"
                onClick={addFavProject}
              >
                Add Project
              </button>
            )}
            {isFavProject && (
              <button
                className="bg-red-900 p-3 rounded text-white hover:border-black hover:text-black hover:bg-transparent border-2"
                type="button"
                onClick={removeFavProject}
              >
                Remove Project
              </button>
            )}
          </div>
        </div>
        <div className="w-[30%] flex flex-col items-center gap-2">
          <img
            src={repo.owner.avatar_url}
            alt="User Avatar"
            className="rounded-full"
          />
          <a
            href={repo.owner.html_url}
            target="_blank"
            className="cursor-pointer"
          >
            {repo.owner.login}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
