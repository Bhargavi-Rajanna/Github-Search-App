import styled from "styled-components";

const SearchInputField = styled.input`
  font-size: 1em;
  width: 150px;
  padding: 10px;
  border: 1px solid #d8d0d0;
  margin-right: 15px;

  @media screen and (min-width: 768px) {
    width: 350px;
    margin-right: 30px;
    padding: 15px;
  }
`;

const SearchInput = ({ getResultsHandler, value }) => {
  return (
    <SearchInputField
      value={value}
      placeholder="Start typing to search ..."
      type="text"
      onChange={(e) => getResultsHandler(e)}
    />
  );
};

export default SearchInput;
