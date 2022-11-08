import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IFavouriteCoder, IFavouriteProject } from "../../models/favourite";

const LS_FAV_CODER_KEY = "fav_coders";
const LS_FAV_PROJ_KEY = "fav_projects";
const LS_COUNT_KEY = "fav_count";

interface GithubState {
  favouritesCoder: IFavouriteCoder[];
  favouritesProjects: IFavouriteProject[];
  countOfFavourites: number;
}

const initialState: GithubState = {
  favouritesCoder: JSON.parse(localStorage.getItem(LS_FAV_CODER_KEY) ?? "[]"),
  favouritesProjects: JSON.parse(localStorage.getItem(LS_FAV_PROJ_KEY) ?? "[]"),
  countOfFavourites: JSON.parse(localStorage.getItem(LS_COUNT_KEY) ?? "0"),
};

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    addFavouritesCoder: (state, action: PayloadAction<IFavouriteCoder>) => {
      state.favouritesCoder.push(action.payload);
      state.countOfFavourites++;

      localStorage.setItem(
        LS_FAV_CODER_KEY,
        JSON.stringify(state.favouritesCoder)
      );
      localStorage.setItem(
        LS_COUNT_KEY,
        JSON.stringify(state.countOfFavourites)
      );
    },
    addFavouritesProject: (state, action: PayloadAction<IFavouriteProject>) => {
      state.favouritesProjects.push(action.payload);
      state.countOfFavourites++;

      localStorage.setItem(
        LS_FAV_PROJ_KEY,
        JSON.stringify(state.favouritesProjects)
      );
      localStorage.setItem(
        LS_COUNT_KEY,
        JSON.stringify(state.countOfFavourites)
      );
    },
    removeFavouritesCoder: (state, action: PayloadAction<number>) => {
      state.favouritesCoder = state.favouritesCoder.filter(
        (coder) => coder.id !== action.payload
      );
      state.countOfFavourites--;

      localStorage.setItem(
        LS_FAV_CODER_KEY,
        JSON.stringify(state.favouritesCoder)
      );
      localStorage.setItem(
        LS_COUNT_KEY,
        JSON.stringify(state.countOfFavourites)
      );
    },
    removeFavouritesProject: (state, action) => {
      state.favouritesProjects = state.favouritesProjects.filter(
        (project) => project.project_url !== action.payload
      );
      state.countOfFavourites--;

      localStorage.setItem(
        LS_FAV_PROJ_KEY,
        JSON.stringify(state.favouritesProjects)
      );
      localStorage.setItem(
        LS_COUNT_KEY,
        JSON.stringify(state.countOfFavourites)
      );
    },
    removeAll: (state) => {
      state.favouritesProjects = [];
      state.favouritesCoder = [];
      state.countOfFavourites = 0;
    },
  },
});

export const {
  addFavouritesCoder,
  addFavouritesProject,
  removeFavouritesProject,
  removeFavouritesCoder,
  removeAll,
} = githubSlice.actions;

export default githubSlice.reducer;
