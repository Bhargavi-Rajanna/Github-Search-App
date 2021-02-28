import SearchResult from "../SearchResult";
import styled from "styled-components";

import ResultsCountMessage from "../ResultsCountMessage";
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
    margin-top: 50px;
  }
`;

const SearchResultsGrid = ({ type, repos, users }) => {
  // console.log("USERS", users);
  // console.log("REPOS", repos);
  //console.log("BHAR RESULTS", results);

  return (
    <>
      <ResultsCountMessage
        type={type}
        count={
          type === "users"
            ? users && users.total_count
            : repos && repos.total_count
        }
      />

      <GridWrapper className="grid-wrapp">
        {type !== "users" ? (
          <>
            {repos &&
              repos.items.map((repo) => (
                <SearchResult key={repo.id} result={repo} type={type} />
              ))}
          </>
        ) : (
          <>
            {users &&
              users.items.map((user) => (
                <SearchResult key={user.id} result={user} type={type} />
              ))}
          </>
        )}
      </GridWrapper>
    </>
  );
};

export default SearchResultsGrid;
