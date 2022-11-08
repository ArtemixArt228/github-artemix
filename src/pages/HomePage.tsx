import React, { useEffect, useState } from "react";
import {
  useLazyGetUserReposQuery,
  useSearchQuery,
} from "../redux/services/github";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);

  const {
    isLoading,
    isError,
    data: users,
  } = useSearchQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  const clickHandler = (userLogin: string) => {
    fetchRepos(userLogin);
    setDropdown(false);
    setSearch("");
  };

  useEffect(() => {
    setDropdown(debounced.length > 3 && users?.length != 0);
  }, [debounced, users]);

  return (
    <div className="p-6 relative">
      {isError && <p className="text-center">Something went wrong...</p>}

      <div className="flex flex-col w-[800px] m-auto items-center">
        <input
          className="rounded-full w-[600px] h-[40px] text-black text-xl px-5"
          type="text"
          placeholder="Search in Github"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {dropdown && (
          <ul className="my-3 bg-white rounded-xl text-black w-[600px] p-3 h-[300px] overflow-y-scroll text-2xl z-20">
            {isLoading && <p>Loading...</p>}
            {users?.map((user) => (
              <li
                className="my-1 text-center border-2 border-black rounded-full hover:text-white hover:bg-black cursor-pointer"
                key={user.id}
                onClick={() => clickHandler(user.login)}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="absolute top-[90px]">
          {areReposLoading && <p>Repos are loading...</p>}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
