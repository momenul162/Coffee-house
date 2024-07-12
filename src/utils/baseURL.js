import axios from "axios";

const token = localStorage.getItem("jwt-access-token");

export const baseURL = axios.create(
  token && {
    baseURL: "https://nexus-coffee-house-app.vercel.app",
    headers: {
      ...(token && { Authorization: "Bearer " + token }),
    },
  }
);
