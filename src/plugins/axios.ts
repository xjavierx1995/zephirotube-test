import axios, { AxiosInstance } from "axios";

const $axios: AxiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com"
});

export default $axios;