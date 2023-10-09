import axios from "axios";

// axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: "https://nlp-api.fly.dev/",
  headers: {
    "Content-type": "application/json",
  },
});
