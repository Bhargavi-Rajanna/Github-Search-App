import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import styled from "styled-components";

// Utils
import { getResults } from "../utils/api";
import * as actions from "../actions";

// Components
import Title from "../components/Title";
import SearchInput from "../components/SearchInput";
import Dropdown from "../components/Dropdown";
import SearchResultsGrid from "../components/SearchResultsGrid";
import ResultsCountMessage from "../components/ResultsCountMessage";
import RecentSearch from "../components/RecentSearch";
import ErrorMessage from "../components/ErrorMessage";

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
  padding: 10px;

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

const Landing = () => {
  const [searchString, setSearchString] = useState("");
  const [type, setType] = useState("users");
  const [listItems, setListItems] = useState([]);
  const [listCount, setListCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const searchStringsArray = useSelector((state) => state.searchStringReducer);
  const dispatch = useDispatch();

  let isSearchStringEmpty = true;
  if (searchString.length > 0) {
    isSearchStringEmpty = false;
  }

  const callApi = async (searchQuery, pageIndex) => {
    if (searchString.length < 3 || isLoading) return;

    try {
      setIsLoading(true);
      const response = await getResults(searchQuery, type, pageIndex);

      if (response === 403) {
        setIsError(true);
        setIsLoading(false);
        setErrorMessage(
          "API rate limit exceeded for your IP. Check out github API documentation for more details "
        );
      } else {
        let mergedResponse = response.items;
        if (pageIndex > 1) {
          mergedResponse = [...listItems, ...response.items];
        }
        if (response && response.items) {
          setListItems(mergedResponse);
          setIsError(false);
          dispatch(actions.addSearchStringAction(type, searchQuery));
          setListCount(response.total_count);
          setPageNumber(pageIndex);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  const getResultsHandler = (e) => {
    setSearchString(e.target.value);
  };

  const delayedQuery = useCallback(debounce(callApi, 1000));

  const onSubmitHandle = (e) => {
    e.preventDefault();
    callApi(searchString, 1);
  };

  const savedSearchTermHandle = (e) => {
    delayedQuery(e.target.innerText);
  };

  const drowpdownToggle = (selectOption) => {
    setType(selectOption.toLowerCase());
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetching(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  // useEffect(() => {
  //   delayedQuery(searchString, 1000);
  //   //Cancel the debounce on useEffect cleanup.
  //   return delayedQuery.cancel;
  // }, [searchString, type, delayedQuery, pageNumber]);

  const fetchMoreListItems = () => {
    if (listItems) {
      if (listCount < listItems.length) return;
      const newPageNumber = pageNumber + 1;
      callApi(searchString, newPageNumber);
      setIsFetching(false);
    }
  };

  return (
    <Container isSearchStringEmpty={isSearchStringEmpty}>
      <Wrapper>
        <Title
          title="GitHub Searcher"
          caption="Search users or repositories below"
        />
        <SearchForm>
          <form onSubmit={onSubmitHandle}>
            <SearchInput getResultsHandler={getResultsHandler} />
          </form>
          <Dropdown onClick={(selected) => drowpdownToggle(selected)} />
        </SearchForm>

        {!isError ? (
          <div id="results-container">
            {searchString.length >= 3 &&
              (isLoading ? (
                <h1>Loading...</h1>
              ) : (
                <>
                  <RecentSearch
                    searchStringsArray={searchStringsArray}
                    type={type}
                    onClickHandle={savedSearchTermHandle}
                  />

                  <ResultsCountMessage type={type} count={listCount} />
                  <SearchResultsGrid
                    listItems={listItems}
                    type={type}
                  ></SearchResultsGrid>
                </>
              ))}
          </div>
        ) : (
          <ErrorMessage message={errorMessage} />
        )}
      </Wrapper>
    </Container>
  );
};

export default Landing;
