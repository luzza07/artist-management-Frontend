import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/users";

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
    const response = await axios.post(`${API_BASE_URL}/auth/signup/`, userData);
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
    const response = await axios.post(`${API_BASE_URL}/auth/login/`, credentials);
    console.log("Login response:", response.data); // Debug: Log response
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message); // Debug: Log error
    throw error.response ? error.response.data : error.message;
  }
};

const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Unified Dashboard API
export const getDashboard = async (token: string) => {
  try {
    setAuthToken(token); // Attach the token for authorization
    const response = await axios.get(`${API_BASE_URL}/dashboard/`);
    console.log("Dashboard data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Dashboard error:", error.response?.data || error.message);
    throw error.response ? error.response.data : error.message;
  }
};