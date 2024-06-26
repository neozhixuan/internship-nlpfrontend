import { useState } from "react";
import { QueryService } from "../services/query";

const Interface = () => {
  const [load, setLoad] = useState(false);
  const [loadGPT, setLoadGPT] = useState(false);
  const [bert, setBert] = useState("");
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
  const [gpt, setGpt] = useState("Empty");
  const queryService = new QueryService();

  const triggerLoad = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Check");
    setError("Loading");
    console.log("Check2");
    sendQuery(e);
    setError("");
  };
  const sendQuery = (e: React.FormEvent<HTMLFormElement>) => {
    setLoad(true);
    e.preventDefault();
    queryService
      .sendQuery(input)
      .then((response) => {
        const data = response.data;

        if (data) {
          gpt !== "Empty" && setGpt("Empty");
          const similarities = data["results"]["similarities"];
          const bert = data["results"]["bertanswer"];
          if (similarities.length > 0) {
            setBert(bert);
            setResults(similarities);
          } else {
            const res = { document: "No results found.", similarity_score: 1 };
            setBert("");
            setResults((prevResults) => [res]);
          }
          setSentences(data["results"]["sentences"]);
          setLoad(false);
        } else {
          setError("Something occurred");
          setLoad(false);
        }
      })
      .catch((e) => {
        setError(e);
        setLoad(false);
      });
  };

  const githubIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72 72"
      width="64px"
      height="64px"
    >
      <path d="M 36 12 C 22.745 12 12 22.745 12 36 C 12 49.255 22.745 60 36 60 C 49.255 60 60 49.255 60 36 C 60 22.745 49.255 12 36 12 z M 36 20 C 44.837 20 52 27.163 52 36 C 52 43.284178 47.128298 49.420174 40.46875 51.355469 C 40.198559 51.103128 39.941627 50.74363 39.953125 50.285156 C 39.980125 49.233156 39.953125 46.778953 39.953125 45.876953 C 39.953125 44.328953 38.972656 43.230469 38.972656 43.230469 C 38.972656 43.230469 46.654297 43.316141 46.654297 35.119141 C 46.654297 31.957141 45.003906 30.310547 45.003906 30.310547 C 45.003906 30.310547 45.872125 26.933953 44.703125 25.501953 C 43.393125 25.359953 41.046922 26.753297 40.044922 27.404297 C 40.044922 27.404297 38.457406 26.753906 35.816406 26.753906 C 33.175406 26.753906 31.587891 27.404297 31.587891 27.404297 C 30.586891 26.753297 28.239687 25.360953 26.929688 25.501953 C 25.760688 26.933953 26.628906 30.310547 26.628906 30.310547 C 26.628906 30.310547 24.974609 31.956141 24.974609 35.119141 C 24.974609 43.316141 32.65625 43.230469 32.65625 43.230469 C 32.65625 43.230469 31.782197 44.226723 31.693359 45.652344 C 31.180078 45.833418 30.48023 46.048828 29.8125 46.048828 C 28.2025 46.048828 26.978297 44.483766 26.529297 43.759766 C 26.086297 43.045766 25.178031 42.447266 24.332031 42.447266 C 23.775031 42.447266 23.503906 42.726922 23.503906 43.044922 C 23.503906 43.362922 24.285781 43.585781 24.800781 44.175781 C 25.887781 45.420781 25.866281 48.21875 29.738281 48.21875 C 30.196553 48.21875 31.021102 48.11542 31.677734 48.025391 C 31.674106 48.90409 31.663893 49.74536 31.677734 50.285156 C 31.688158 50.700354 31.476914 51.032045 31.236328 51.279297 C 24.726159 49.25177 20 43.177886 20 36 C 20 27.163 27.163 20 36 20 z" />
    </svg>
  );

  const gptCallHandler = () => {
    console.log("Check");
    setLoadGPT(true);
    console.log("Check2");
    queryService
      .sendGPT(input, results[0]["document"])
      .then((response) => {
        const data = response.data;

        if (data) {
          const data = response.data;
          console.log(data);
          setGpt(data["answer"]);
        } else {
          setGpt("There was an error with the OpenAI API. Try again later.");
        }
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      });
    setLoadGPT(false);
  };

  return (
    <div className="container w-[70%] mx-[15%]  h-full">
      <div className="flex flex-col gap-5 h-full">
        <div
          className="border border-black p-3"
          style={{ backgroundColor: "#536872" }}
        >
          <h1
            className="text-xl font-black text-white text-center"
            style={{ color: "#F5F5DC" }}
          >
            Work Permit Bot
          </h1>
          <h2
            className="mt-2 text-lg font-bold text-center"
            style={{ color: "#F5F5DC" }}
          >
            Enter your queries and our bot will look through all the Work Permit
            information on the{" "}
            <a
              className="text-blue-200 no-underline"
              href="https://www.mom.gov.sg/"
            >
              MOM Website
            </a>{" "}
            to find the most relevant article and information for you!
          </h2>
        </div>
        <form className="w-full" onSubmit={(e) => triggerLoad(e)}>
          <p>Input your query:</p>
          <div className="flex flex-row gap-5">
            <input
              className="px-2 w-full border border-black rounded-lg"
              type="text"
              placeholder="e.g. How long is a work permit valid for?"
              value={input} // Use the state value
              onChange={(e) => setInput(e.target.value)} // Update state on input change
            />
            <button
              type="submit"
              className={`bg-white px-3 py-1 border rounded-lg ${
                load
                  ? "border-gray-400 text-gray-400"
                  : "border-black text-black"
              }`}
              disabled={load}
            >
              Submit
            </button>
          </div>
        </form>{" "}
        {error.length > 0 && <p>{error}</p>}
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
                        href={`/files/${result.document.toString()}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {idx + 1}: {result.document.toString()}
                      </a>
                      <p>
                        Confidence Score:{" "}
                        <span
                          className={`${
                            result.similarity_score * 100 < 33
                              ? "text-red-700"
                              : result.similarity_score * 100 > 66
                              ? "text-green-700"
                              : "text-yellow-700"
                          }`}
                        >
                          {(result.similarity_score * 100)
                            .toFixed(3)
                            .toString()}
                          %
                        </span>
                      </p>
                      {/* {idx === 0 && (
                        <div className="border border-black rounded-lg p-3 italic my-2">
                          <p className="font-bold">Answer:</p>
                          <p>{bert}</p>
                        </div>
                      )} */}
                      {idx === 0 &&
                        (gpt === "Empty" ? (
                          loadGPT ? (
                            <p>Loading...</p>
                          ) : (
                            <button
                              className={`bg-white px-3 py-1 border rounded-lg ${
                                results[0]["document"] === "Document Name"
                                  ? "border-gray-400 text-gray-400"
                                  : "border-black text-black"
                              }`}
                              onClick={gptCallHandler}
                              disabled={
                                results[0]["document"] === "Document Name"
                              }
                            >
                              Generate an AI response from this text!
                            </button>
                          )
                        ) : (
                          <div className="border border-black rounded-lg p-3 italic">
                            <p className="font-bold">GPT read this and says:</p>
                            <p>{gpt}</p>
                          </div>
                        ))}
                    </div>
                  );
                })
              ) : (
                <p>No documents found</p>
              )}
            </div>
            <h2 className="font-bold">
              Most relevant text result from the texts:
            </h2>
            <div className="container border border-black rounded-xl p-3 flex flex-col gap-3 w-full">
              {sentences && sentences.length > 0 ? (
                sentences.map((result, idx) => {
                  return (
                    <div key={idx} className="">
                      {idx === 0 ? (
                        <p>
                          <span className="font-bold">
                            Best match from "{results[0].document}":{" "}
                          </span>
                          {result.sentence.toString()}
                        </p>
                      ) : (
                        <p>
                          <span className="font-bold">{idx}: </span>
                          {result.sentence.toString()}
                        </p>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>No results found</p>
              )}
            </div>
          </div>
        ) : (
          <div>Loading... (cold starts will take 10-15 seconds)</div>
        )}
        <a
          className="flex justify-center"
          href="https://github.com/neozhixuan/internship-nlpfrontend/tree/main"
          target="_blank"
          rel="noreferrer"
        >
          {githubIcon}
        </a>
      </div>
    </div>
  );
};

export default Interface;
