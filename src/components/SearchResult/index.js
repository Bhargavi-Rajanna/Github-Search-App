import styled from "styled-components";
import { dateConvertor } from "../../utils/dateConvertor";

const Wrapper = styled.div`
  display: inline-flex;
  border: 2px solid #e5e5e5;
  padding: 20px;
  flex-direction: column;
  align-items: center;
`;
const UserImage = styled.img`
  max-width: 100px;
  min-width: 100px;
  max-height: 100px;
  margin-bottom: 10px;
  object-fit: contain;

  @media screen and (min-width: 768px) {
    // margin: 0 auto;
    max-width: 200px;
    min-width: 200px;
    max-height: 200px;
  }
`;

const DIV = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(85px, 150px));
  // grid-template-columns: repeat(2, 1fr);
  overflow-wrap: break-word;
  padding: 3px 5px 5px;
  font-size: 0.8em;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(100px, 200px));
    // grid-template-columns: repeat(2, 1fr);
    padding: 5px 10px 10px;
    font-size: 1em;
  }
`;

const SearchResult = ({ result, type }) => {
  return (
    <Wrapper>
      {type !== "users" ? (
        <>
          <div>
            <UserImage
              src={result.owner.avatar_url}
              alt="avatar_url"
            ></UserImage>
          </div>

          <div>
            <DIV>
              <div> Full Name : </div>
              <div> {result.full_name}</div>
            </DIV>
            <DIV>
              <div> Repos Language : </div>
              <div> {result.language ? result.language : "NA"}</div>
            </DIV>
            <DIV>
              <div> Private : </div>
              <div> {result.private ? "true" : "false"}</div>
            </DIV>
            <DIV>
              <div> Pushed At : </div>
              <div>{dateConvertor(result.pushed_at)}</div>
            </DIV>
            <DIV>
              <div> Stars : </div>
              <div>{result.stargazers_count}</div>
            </DIV>
            <DIV>
              <div> Watchers : </div>
              <div>{result.watchers}</div>
            </DIV>
            <DIV>
              <div> Forks : </div>
              <div>{result.forks}</div>
            </DIV>
            <DIV>
              <div> Open Issues : </div>
              <div>{result.open_issues}</div>
            </DIV>
          </div>
        </>
      ) : (
        <>
          <UserImage src={result.avatar_url} alt="avatar_url"></UserImage>

          <span>{result.login}</span>
        </>
      )}
    </Wrapper>
  );
};

export default SearchResult;
