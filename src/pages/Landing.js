import { useState, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import styled from "styled-components";

// Utils
import { getResults } from "../utils/api";

// Components
import Title from "../components/Title";
import SearchInput from "../components/SearchInput";
import Dropdown from "../components/Dropdown";
import SearchResultsGrid from "../components/SearchResultsGrid";

const Container = styled.div`
  ${({ isSearchStringEmpty }) =>
    isSearchStringEmpty &&
    `
    display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  `}
`;

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 25px;

  @media screen and (min-width: 768px) {
    margin: 0 auto;
  }
`;

const SearchForm = styled.div`
  margin-top: 10px;
  display: inline-flex;
  @media screen and (min-width: 768px) {
    margin-top: 20px;
  }
`;

const SearchDiv = styled.div`
  min-width: 250px;
  margin-right: 35px;

  @media screen and (min-width: 768px) {
    min-width: 350px;
    margin-right: 50px;
  }
`;

// Before callApi, we need to check the reducer. So if searchString === item.searchTerm then we can return that object.

// [{ searchTerm: 'james', data: {}}] ... this can be for last 10 results or 5.

// reducer should recieve { searchTerm, data } and add it to top of the array. It should then remove the last if the length is greater than 10.

const Landing = () => {
  const [searchString, setSearchString] = useState("");
  const [type, setType] = useState("users");
  const [users, setUsers] = useState();
  const [repos, setRepos] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  let isSearchStringEmpty = true;
  if (searchString.length > 0) {
    isSearchStringEmpty = false;
  }

  console.log("searchString", searchString, searchString.length);

  const callApi = async () => {
    if (searchString.length < 3) {
      console.log("SEARCH LESS THAN 3");
      return;
    }

    try {
      const response = await getResults(searchString, type);
      if (type === "users") {
        setUsers(response);
      } else {
        setRepos(response);
      }

      console.log("response RESULTS LANDING", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const delayedQuery = useCallback(debounce(callApi, 500), [
    searchString,
    type,
  ]);

  const getResultsHandler = (e) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    delayedQuery();
    // Cancel the debounce on useEffect cleanup.
    return delayedQuery.cancel;
  }, [searchString, type, delayedQuery]);

  return (
    <Container isSearchStringEmpty={isSearchStringEmpty}>
      <Wrapper>
        <Title
          title="GitHub Searcher"
          caption="Search users or repositories below"
        />
        <SearchForm>
          <SearchDiv>
            <SearchInput getResultsHandler={getResultsHandler} />
          </SearchDiv>
          <Dropdown onClick={(selected) => setType(selected.toLowerCase())} />
        </SearchForm>
        {searchString.length >= 3 && (users || repos) && (
          <SearchResultsGrid
            users={users}
            repos={repos}
            type={type}
          ></SearchResultsGrid>
        )}
      </Wrapper>
    </Container>
  );
};

export default Landing;
