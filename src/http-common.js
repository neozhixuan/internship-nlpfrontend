import axios from "axios";

// axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: "https://nlp-api-hroi.onrender.com/",
  headers: {
    "Content-type": "application/json",
  },
});
