import axios from "axios";

export const getResults = async (value, type, pageNumber) => {
  let pageNo = pageNumber ? pageNumber : 1;
  try {
    const response = await axios.get(
      `https://api.github.com/search/${type}?q=${value}&page=${pageNo}`
    );

    const data = await response.data;

    return data;
  } catch (error) {
    return error.response.data, error.response.status;
  }
};
