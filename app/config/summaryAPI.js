import axios from "axios";
import { url } from "~/env";
export const baseURL = url;

export const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const summary = {
  getDoctors: {
    url: "/getAllBasicData",
    method: "get",
  },
  getFamily: {
    url: "/getFamily",
    method: "get",
  },
};
