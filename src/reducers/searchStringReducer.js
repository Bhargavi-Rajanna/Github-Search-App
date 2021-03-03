const searchStringReducer = (
  state = {
    users: [],
    repositories: [],
  },
  action
) => {
  switch (action.type) {
    case "ADD_SEARCH_STRING":
      let newState = state;
      const arr = newState[action.searchType];

      if (arr.indexOf(action.searchTerm) > -1) {
        arr.splice(arr.indexOf(action.searchTerm), 1);
      }

      arr.unshift(action.searchTerm);

      if (arr.length > 3) arr.pop();
      console.log("searchStringReducer", newState);
      return newState;

    default:
      return state;
  }
};

export default searchStringReducer;
