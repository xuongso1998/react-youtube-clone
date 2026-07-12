import axios from "axios";
// Set config defaults when creating the instance
const api = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
});
export default api;
