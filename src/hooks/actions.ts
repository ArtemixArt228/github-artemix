import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import {
  addFavouritesCoder,
  addFavouritesProject,
  removeFavouritesCoder,
  removeFavouritesProject,
  removeAll,
} from "../redux/features/githubSlice";

const actions = {
  addFavouritesCoder,
  addFavouritesProject,
  removeFavouritesCoder,
  removeFavouritesProject,
  removeAll,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
