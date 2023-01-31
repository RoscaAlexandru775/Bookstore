import axios from "axios";

const token = localStorage.getItem("authToken");

export default axios.create({
  baseURL:  "http://localhost:3001/api" ,
  headers: { 
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`, 
  },

});
