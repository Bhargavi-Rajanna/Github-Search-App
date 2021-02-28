import styled from "styled-components";

const SearchInputField = styled.input`
  font-size: 1em;
  min-width: 100%;
  padding: 10px;
  border: 1px solid #d8d0d0;

  @media screen and (min-width: 768px) {
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
    ></SearchInputField>
  );
};

export default SearchInput;
