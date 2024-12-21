import axios from "axios";

const token = localStorage.getItem("jwt-access-token");

export const baseURL = axios.create(
  token && {
    baseURL: "http://localhost:4000",
    headers: {
      ...(token && { Authorization: "Bearer " + token }),
    },
  }
);
