export const dateConvertor = (dateString) => {
  let date = new Date(dateString);
  return date.toDateString() + " " + date.toLocaleString();
  //return date.toDateString();
};
