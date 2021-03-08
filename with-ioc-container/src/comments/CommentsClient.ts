import axios from "axios";

export const commentsClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 1000,
});
