import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/users/auth";

// SignUp API
export const signUp = async (userData: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  role_type: string;
}) => {
  try {
    console.log("Sending signup request with data:", userData); // Debug: Log request payload
    const response = await axios.post(`${API_BASE_URL}/signup/`, userData);
    console.log("Signup response:", response.data); // Debug: Log response
    return response.data;
  } catch (error: any) {
    console.error("Signup error:", error.response?.data || error.message); // Debug: Log error
    throw error.response ? error.response.data : error.message;
  }
};

// Login API
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    console.log("Sending login request with data:", credentials); // Debug: Log request payload
    const response = await axios.post(`${API_BASE_URL}/login/`, credentials);
    console.log("Login response:", response.data); // Debug: Log response
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message); // Debug: Log error
    throw error.response ? error.response.data : error.message;
  }
};
