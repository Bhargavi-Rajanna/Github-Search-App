const ResultsCountMessage = ({ count, type }) => {
  return (
    <>
      <p>
        {count} {type} found
      </p>
    </>
  );
};

export default ResultsCountMessage;
