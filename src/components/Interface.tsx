import { useState } from "react";
import { QueryService } from "../services/query";
const Interface = () => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [sentences, setSentences] = useState([
    {
      sentence: "This is a sample answer",
    },
  ]);
  const [results, setResults] = useState([
    { document: "Document Name", similarity_score: 1 },
  ]);
  const queryService = new QueryService();
  const sendQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);
    queryService
      .sendQuery(input)
      .then((response) => {
        const data = response.data;

        if (data) {
          console.log(data);
          setResults(data["results"]);
          setSentences(data["sentences"]);
        } else {
          setError("Something occurred");
        }
      })
      .catch((e) => {
        setError(e);
      });
    setLoad(false);
  };

  return (
    <div className="container w-[70%] mx-[15%]">
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
        {!load ? (
          <div>
            <h2 className="font-bold">Most relevant documents:</h2>
            <div className="mb-3 container border border-black rounded-xl p-3 flex flex-col gap-3 w-full">
              {" "}
              {results && results.length > 0 ? (
                results.map((result, idx) => {
                  return (
                    <div key={idx} className="">
                      <a
                        className="font-bold"
                        href={`/${result.document.toString()}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {result.document.toString()}
                      </a>
                      <p>
                        Confidence Score:{" "}
                        {(result.similarity_score * 100).toFixed(3).toString()}%
                      </p>
                    </div>
                  );
                })
              ) : (
                <p>No documents found</p>
              )}
            </div>
            <h2 className="font-bold">Most relevant answer from the texts:</h2>
            <div className="container border border-black rounded-xl p-3 flex flex-col gap-3 w-full">
              {sentences && sentences.length > 0 ? (
                sentences.map((result, idx) => {
                  return (
                    <div key={idx} className="">
                      <p>
                        {idx + 1}: {result.sentence.toString()}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p>No results found</p>
              )}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Interface;
