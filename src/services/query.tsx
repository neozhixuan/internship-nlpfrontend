import http from "../http-common";

export class QueryService {
  sendQuery(input: string) {
    return http.get("/api/similarity", { query: input });
  }
}
