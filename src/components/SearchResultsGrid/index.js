import SearchResult from "../SearchResult";
import styled from "styled-components";
import React, { memo } from "react";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2,  1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin-top: 30px;
  }

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    margin-top: 75px;
  }
`;

const SearchResultsGrid = memo(({ type, listItems }) => {
  return (
    <GridWrapper>
      {listItems &&
        listItems.map((item, index) => (
          <SearchResult key={`${item.id}-${index}`} result={item} type={type} />
        ))}
    </GridWrapper>
  );
});

export default SearchResultsGrid;
