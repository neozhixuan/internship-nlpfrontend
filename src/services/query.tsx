import http from "../http-common";

export class QueryService {
  sendQuery(input: string) {
    return http.post("/api/similarity", { query: input });
  }
}
