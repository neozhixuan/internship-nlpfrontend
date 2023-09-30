import React from "react";
import { useEffect } from "react";
import Interface from "./components/Interface";
function App() {
  useEffect(() => {
    document.title = "Information Retrieval";
  }, []);

  return (
    <div
      className="w-screen min-h-screen p-5 pt-10"
      style={{ backgroundColor: "#F5F5DC" }}
    >
      <Interface />
    </div>
  );
}

export default App;
