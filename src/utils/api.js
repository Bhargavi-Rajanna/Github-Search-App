import axios from "axios";

export const getResults = async (value, type) => {
  try {
    const response = await axios.get(
      // `https://api.github.com/search/${type}?q=${value}&page=${pageNumber}`
      `https://api.github.com/search/${type}?q=${value}`
    );

    const data = await response.data;

    return data;
  } catch (error) {
    return error;
  }
};
