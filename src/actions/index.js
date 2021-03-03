import { UPDATE_USERS, ADD_SEARCH_STRING } from "../constants/actionTypes";

export const updateUsersAction = (data, searchTerm) => {
  return { type: UPDATE_USERS, searchTerm, data };
};

export const addSearchStringAction = (searchType, searchTerm) => {
  return { type: ADD_SEARCH_STRING, searchTerm, searchType };
};
