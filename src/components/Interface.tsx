import { useState } from "react";
import { QueryService } from "../services/query";
const Interface = () => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const queryService = new QueryService();
  const sendQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    queryService
      .sendQuery(input)
      .then((response) => {
        const data = response.data;

        if (data) {
          console.log(data);
          setResults(data["results"]);
        } else {
          setError("Something occurred");
        }
      })
      .catch((e) => {
        setError(e);
      });
  };

  return (
    <div className="container w-[50%] mx-[25%]">
      <div className="flex flex-col gap-5">
        {" "}
        <form className="w-full" onSubmit={(e) => sendQuery(e)}>
          <p>Input your query:</p>
          <div className="flex flex-row gap-5">
            <input
              className="px-2 w-full border border-black rounded-lg"
              type="text"
              value={input} // Use the state value
              onChange={(e) => setInput(e.target.value)} // Update state on input change
            />
            <button
              type="submit"
              className="bg-white px-3 py-1 border border-black rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
        {/* <div>
          {load ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <p>Results loaded.</p>
          )}
        </div> */}
        <div>
          {" "}
          {/* {results.length > 0 &&
            results.map((result, idx) => {
              return (
                <div key={idx}>
                  {result.document.toString()} -{" "}
                  {result.similarity_score.toString()}
                </div>
              );
            })} */}
        </div>
      </div>
    </div>
  );
};

export default Interface;
