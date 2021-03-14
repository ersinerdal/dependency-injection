import axios from "axios";
export { AxiosInstance as Client } from "axios";

export const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 1000,
});
