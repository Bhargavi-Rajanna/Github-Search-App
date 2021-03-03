import styled from "styled-components";
import { dateConvertor } from "../../utils/dateConvertor";

const Wrapper = styled.div`
  display: flex;
  border: 2px solid #e5e5e5;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const UserImage = styled.img`
  max-width: 100%;
  margin-bottom: 10px;
  justify-self: center;

  @media screen and (min-width: 768px) {
    max-width: 200px;
    max-height: 200px;
  }
`;

const Username = styled.span`
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(85px, 150px));
  overflow-wrap: break-word;
  padding: 3px 5px 5px;
  font-size: 0.8em;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(100px, 200px));
    padding: 5px 10px 10px;
    font-size: 0.8em;
    grid-row-gap: 5px;

    > div:nth-child(1) {
      font-weight: 600;
      font-size: 1em;
    }
  }
`;

const SearchResult = ({ result, type }) => {
  return (
    <Wrapper>
      {type !== "users" && result.type !== "User" ? (
        <>
          <a href={result.html_url} target="_blank" rel="noopener noreferrer">
            <div>
              <UserImage
                src={result.owner?.avatar_url}
                alt="avatar_url"
                loading="lazy"
              ></UserImage>
            </div>
          </a>
          <div>
            <ListItem>
              <div> Full Name : </div>
              <div> {result.full_name}</div>
            </ListItem>
            <ListItem>
              <div> Repos Language : </div>
              <div> {result.language ? result.language : "NA"}</div>
            </ListItem>
            <ListItem>
              <div> Private : </div>
              <div> {result.private ? "true" : "false"}</div>
            </ListItem>
            <ListItem>
              <div> Pushed At : </div>
              <div>{dateConvertor(result.pushed_at)}</div>
            </ListItem>
            <ListItem>
              <div> Stars : </div>
              <div>{result.stargazers_count}</div>
            </ListItem>
            <ListItem>
              <div> Watchers : </div>
              <div>{result.watchers}</div>
            </ListItem>
            <ListItem>
              <div> Forks : </div>
              <div>{result.forks}</div>
            </ListItem>
            <ListItem>
              <div> Open Issues : </div>
              <div>{result.open_issues}</div>
            </ListItem>
          </div>
        </>
      ) : (
        <>
          <a href={result.html_url} target="_blank" rel="noopener noreferrer">
            <UserImage
              src={result.avatar_url}
              loading="lazy"
              alt="avatar_url"
            ></UserImage>{" "}
          </a>

          <Username>{result.login}</Username>
        </>
      )}
    </Wrapper>
  );
};

export default SearchResult;
