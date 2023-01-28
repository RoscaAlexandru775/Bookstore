import axios from "axios";

const token = localStorage.getItem("token");

export default axios.create({
  baseURL:  "http://localhost:8091" ,
  headers: { 
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`, 
  },
  withCredentials: true,
});
