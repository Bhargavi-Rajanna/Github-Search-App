import styled from "styled-components";

const ListItem = styled.li`
  padding: 5px 10px;
  display: inline;
  margin-right: 5px;
  border: 1px solid #e5e5e5;
  user-select: none;
`;

const RecentSearch = ({ searchStringsArray, type, onClickHandle }) => {
  return (
    <div>
      {searchStringsArray[type].length > 0 && (
        <>
          <p> Recent Searches : </p>
          <div>
            {searchStringsArray[type].map((item) => (
              <ListItem key={item} onClick={(item) => onClickHandle(item)}>
                {item}
              </ListItem>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentSearch;
