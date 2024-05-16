import http from "../http-common";

export class QueryService {
  sendQuery(input: string) {
    return http.post(
      "/api/similarity",
      { query: input }
    );
  }
  sendGPT(input: string, top_doc: string) {
    return http.post("/api/gpt_call", { query: input, top_doc: top_doc });
  }
}
