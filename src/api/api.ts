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
    console.log("Sending signup request with data:", userData);
    const response = await axios.post(`${API_BASE_URL}/auth/signup/`, userData);
    console.log("Signup response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Login API - Updated to correctly extract role_type from user object
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    console.log("Sending login request with data:", credentials);
    
    // Clear previous auth data
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    
    const response = await axios.post(`${API_BASE_URL}/auth/login/`, credentials);
    console.log("Login response:", response.data);
    
    // Extract token and role information
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    
    // Important: Based on your API structure, role_type is inside user object
    if (response.data.user && response.data.user.role_type) {
      const roleType = response.data.user.role_type;
      localStorage.setItem('user_role', roleType);
      console.log("Stored role from user object:", roleType);
    }
    
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
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

// Logout function
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_role');
  delete axios.defaults.headers.common['Authorization'];
};

// Unified Dashboard API - Choose correct endpoint based on role
export const getDashboard = async (token: string) => {
  try {
    setAuthToken(token);
    
    // Get the user role
    const userRole = localStorage.getItem('user_role');
    
    // Choose the correct endpoint based on role
    let endpoint = '/dashboard/';
    if (userRole === 'super_admin') {
      endpoint = '/dashboard/super-admin/';
    } else if (userRole === 'artist_manager') {
      endpoint = '/dashboard/artist-manager/';
    } else if (userRole === 'artist') {
      endpoint = '/dashboard/artist/';
    }
    
    console.log(`Fetching dashboard from ${endpoint} for role: ${userRole}`);
    
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    console.log("Dashboard data:", response.data);
    
    return {
      ...response.data,
      // Explicitly include the role in the returned data
      user_role: userRole
    };
  } catch (error: any) {
    console.error("Dashboard error:", error.response?.data || error.message);
    throw error.response ? error.response.data : error.message;
  }
};