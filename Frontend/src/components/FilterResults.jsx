const FilterResults = ({ data, selectedCategories }) => {
  if (!data || typeof data !== "object") {
    return <p>No valid data received.</p>;
  }

  let displayResults = [];

  selectedCategories.forEach((cat) => {
    if (cat.value === "numbers" && data.numbers && data.numbers.length) {
      displayResults.push(<p key="numbers"><strong>Numbers:</strong> {data.numbers.join(", ")}</p>);
    }
    if (cat.value === "alphabets" && data.alphabets && data.alphabets.length) {
      displayResults.push(<p key="alphabets"><strong>Alphabets:</strong> {data.alphabets.join(", ")}</p>);
    }
    if (cat.value === "highestAlphabet" && data.highest_alphabet) {
      displayResults.push(<p key="highestAlphabet"><strong>Highest Alphabet:</strong> {data.highest_alphabet}</p>);
    }
  });

  return (
    <div>
      {displayResults.length ? (
        <>
          <h3>Filtered Response</h3>
          {displayResults}
        </>
      ) : (
        <p>Filtered Response: No data</p>
      )}
    </div>
  );
};

export default FilterResults;
