import axios from "axios";
export const baseURL = "http://192.168.18.21:8080/tabib";

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
