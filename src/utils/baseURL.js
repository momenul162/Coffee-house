import axios from "axios";

const token = localStorage.getItem("jwt-access-token");

export const baseURL = axios.create(
  token && {
    baseURL: "https://nexus-coffee-house.onrender.com",
    headers: {
      ...(token && { Authorization: "Bearer " + token }),
    },
  }
);
