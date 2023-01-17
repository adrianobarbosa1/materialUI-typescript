import axios from "axios";
import { Environment } from "../../environment/environment";
import { errorInterceptor } from "./ErrorInterceptor";
import { responseInterceptor } from "./ResponseInterceptor";

const Api = axios.create({
  baseURL: Environment.URL_BASE,
});

Api.interceptors.response.use((res)=> responseInterceptor(res), (error) => errorInterceptor(error));

export {Api};