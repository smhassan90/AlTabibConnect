import axios from "axios";
export const baseURL = "http://altabibserver.fynals.com:8080/tabib/";

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
