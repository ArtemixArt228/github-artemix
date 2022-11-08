import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IUser, ServerResponse } from "../../models/github";
import { IRepo } from "../../models/repos";

export const githubApi = createApi({
  reducerPath: "github",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    search: build.query<IUser[], string>({
      query: (search) => `search/users?q=${search}&per_page=10`,
      transformResponse: (response: ServerResponse<IUser>) => response.items,
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => `users/${username}/repos`,
    }),
  }),
});

export const { useSearchQuery, useLazyGetUserReposQuery } = githubApi;
