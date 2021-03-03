const userReducer = (state = {}, action) => {
  console.log("action", action);

  let newState = state;

  switch (action.type) {
    case "UPDATE_USERS":
      let toMerge = [];
      if (state[action.searchTerm]) {
        toMerge = state[action.searchTerm].items;
      }

      newState[action.searchTerm] = {
        pageNumber: 1,
        items: [...toMerge, ...action.data.items],
        totalCount: action.data.total_count,
      };

      console.log("newState", newState);

      return newState;

    default:
      return state;
  }
};

export default userReducer;
