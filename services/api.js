"use client"
import axios from "axios";
const API_BASE_URL="http://localhost:5001/api/v1"

// Generic API Request Function
const apiRequest = async (endpoint, method = "GET", data = null) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${endpoint}`,
      method,
      data, // Axios automatically stringifies JSON data
      headers: { "Content-Type": "application/json" },
    });

    return response.data; // Axios automatically parses JSON responses
  } catch (error) {
    // Handle errors properly
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      throw new Error(error.response.data.message || "Something went wrong");
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("No response from the server. Please try again.");
    } else {
      // Other errors
      throw new Error(error.message);
    }
  }
};

export default apiRequest;

// Auth API Calls
export const authAPI = {
  signup: (userData) => apiRequest("/user/register", "POST", userData),
  login: (credentials) => apiRequest("/user/login", "POST", credentials),
  logout: () => apiRequest("/logout", "POST"),
  getUserProfile: () => apiRequest("/profile"),
};
