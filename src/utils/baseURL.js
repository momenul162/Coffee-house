import axios from "axios";

const token = localStorage.getItem("jwt-access-token");

export const baseURL = axios.create(
  token && {
    baseURL: "https://nexus-coffee-house.vercel.app",
    headers: {
      ...(token && { Authorization: "Bearer " + token }),
    },
  }
);
