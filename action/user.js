
import { 
  NORMAL_LOADED, 
  NORMAL_LOADING, 
  NAUTH_ERROR, 
  NLOGIN_SUCCESS, 
  NLOGIN_FAIL, 
  NLOGOUT_SUCESS, 
  NREGISTER_SUCCESS, 
  NREGISTER_FAIL,  
  GET_ERROR 
} from './types'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_BASE_URL = "https://resturant-backend-f921.onrender.com"
// const API_BASE_URL = "http://10.0.2.2:7777" // For local development

// Helper function to get auth token
const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('normaltoken');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

// Helper function to create axios config with auth header
const createAuthConfig = async () => {
  const token = await getAuthToken();
  return {
    headers: { 
      "x-auth-token": token,
      "Content-Type": "application/json"
    }
  };
}

// Helper function to handle API errors
const handleApiError = (error, customMessage = 'Something went wrong') => {
  const errorMessage = error.response?.data?.msg || error.message || customMessage;
  console.error('API Error:', errorMessage);
  return errorMessage;
}

// ==================== USER AUTHENTICATION ACTIONS ====================

/**
 * Load current user data
 */
export const loadNormalUser = () => async (dispatch) => {
  try {
    dispatch({ type: NORMAL_LOADING });
    
    const token = await getAuthToken();
    if (!token) {
      dispatch({ type: NAUTH_ERROR });
      return;
    }

    const config = await createAuthConfig();
    const { data } = await Axios.get(`${API_BASE_URL}/normal/getuser`, config);
    
    dispatch({ type: NORMAL_LOADED, payload: data });
  } catch (error) {
    console.error('Error loading user:', error);
    dispatch({ type: NAUTH_ERROR });
  }
}

/**
 * User registration
 */
export const userNormalSign = (signData) => async (dispatch) => {
  try {
    // Validate required fields
    const { name, email, password, cpassword, mobile } = signData;
    if (!name || !email || !password || !cpassword || !mobile) {
      alert('Please fill in all required fields');
      return;
    }

    if (password !== cpassword) {
      alert('Passwords do not match');
      return;
    }

    const { data } = await Axios.post(`${API_BASE_URL}/normal/signup`, signData);
    dispatch({ type: NREGISTER_SUCCESS, payload: data });
    alert('Account created successfully! Welcome aboard! 🎉');
  } catch (error) {
    const errorMessage = handleApiError(error, 'Registration failed');
    alert(errorMessage);
    dispatch({ type: NREGISTER_FAIL });
  }
}

/**
 * User login
 */
export const Nloguser = (loginData) => async (dispatch) => {
  try {
    // Validate required fields
    const { email, password } = loginData;
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    const { data } = await Axios.post(`${API_BASE_URL}/normal/login`, loginData);
    dispatch({ type: NLOGIN_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Login failed');
    alert(errorMessage);
    dispatch({ type: NLOGIN_FAIL });
  }
}

/**
 * User logout
 */
export const nlogout = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('normaltoken');
    dispatch({ type: NLOGOUT_SUCESS });
  } catch (error) {
    console.error('Error during logout:', error);
    dispatch({ type: NLOGOUT_SUCESS }); // Still logout even if storage clear fails
  }
}

// ==================== USER MANAGEMENT ACTIONS ====================

/**
 * Get all users (admin function)
 */
export const getalluser = () => async (dispatch) => {
  try {
    const { data } = await Axios.get(`${API_BASE_URL}/normal/getalluser`);
    dispatch({ type: "GETALLUSER", payload: data });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to fetch users');
    console.error('Error fetching users:', errorMessage);
  }
}

// ==================== REVIEW ACTIONS ====================

/**
 * Add/Update review
 */
export const review = (reviewData) => async (dispatch, getState) => {
  try {
    const config = await createAuthConfig();
    const { data } = await Axios.put(`${API_BASE_URL}/comment`, reviewData, config);
    dispatch({ type: "REVIEW", payload: data });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to submit review');
    alert(errorMessage);
    dispatch({ type: "REVIEW_ERROR", payload: error.response });
  }
}

/**
 * Update existing review
 */
export const updatereview = (reviewData) => async (dispatch) => {
  try {
    const { data } = await Axios.patch(`${API_BASE_URL}/updatecomment`, reviewData);
    dispatch({ type: "UPDATEREVIEW", payload: data });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to update review');
    console.error('Error updating review:', errorMessage);
  }
}

// ==================== ORDER MANAGEMENT ACTIONS ====================

/**
 * Get user's order list
 */
export const getorderlist = () => async (dispatch) => {
  try {
    const token = await getAuthToken();
    if (!token) {
      dispatch({ type: "ORDERLIST", payload: { buyitem: [] } });
      return;
    }

    const config = await createAuthConfig();
    const { data } = await Axios.get(`${API_BASE_URL}/normal/orderitem`, config);
    dispatch({ type: "ORDERLIST", payload: data });
  } catch (error) {
    console.error('Error fetching order list:', error);
    dispatch({ type: "ORDERLIST", payload: { buyitem: [] } });
  }
}

/**
 * Get all orders
 */
export const getorder = () => async (dispatch) => {
  try {
    const { data } = await Axios.get(`${API_BASE_URL}/normal/order`);
    dispatch({ type: "ORDER", payload: data });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to fetch orders');
    console.error('Error fetching orders:', errorMessage);
  }
}

/**
 * Track specific order
 */
export const trackorder = (orderId) => async (dispatch) => {
  try {
    if (!orderId) {
      alert('Order ID is required');
      return;
    }

    const { data } = await Axios.get(`${API_BASE_URL}/normal/trackorder/${orderId}`);
    dispatch({ type: "TRACK", payload: data });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to track order');
    alert(errorMessage);
  }
}

/**
 * Edit order
 */
export const orderedit = (orderData, orderId) => async (dispatch) => {
  try {
    if (!orderId) {
      alert('Order ID is required');
      return;
    }

    const { data } = await Axios.patch(`${API_BASE_URL}/normal/orderedit/${orderId}`, orderData);
    dispatch({ type: "DELORDER", payload: data });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to edit order');
    alert(errorMessage);
  }
}

/**
 * Delete order
 */
export const delorder = (orderId) => async (dispatch) => {
  try {
    if (!orderId) {
      alert('Order ID is required');
      return;
    }

    const { data } = await Axios.delete(`${API_BASE_URL}/normal/order/${orderId}`);
    dispatch({ type: "DELORDER", payload: data });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to delete order');
    alert(errorMessage);
  }
}

// ==================== CART MANAGEMENT ACTIONS ====================

/**
 * Add item to cart
 */
export const addtocart = (cartData) => async (dispatch) => {
  try {
    const config = await createAuthConfig();
    const { data } = await Axios.post(`${API_BASE_URL}/cart/post`, cartData, config);
    dispatch({ type: "ADDDATA", payload: data });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to add item to cart');
    alert(errorMessage);
  }
}

/**
 * Get user's cart
 */
export const getcart = () => async (dispatch) => {
  try {
    const token = await getAuthToken();
    if (!token) {
      dispatch({ type: "ADD_CART", payload: [{ cart: null }] });
      return;
    }

    const config = await createAuthConfig();
    const { data } = await Axios.get(`${API_BASE_URL}/cart/get`, config);
    dispatch({ type: "ADD_CART", payload: data });
  } catch (error) {
    console.error('Error fetching cart:', error);
    dispatch({ type: "ADD_CART", payload: [{ cart: null }] });
  }
}

/**
 * Delete specific cart item
 */
export const delCart = (cartItemId) => async (dispatch) => {
  try {
    if (!cartItemId) {
      alert('Cart item ID is required');
      return;
    }

    const config = await createAuthConfig();
    const { data } = await Axios.delete(`${API_BASE_URL}/cart/del/${cartItemId}`, config);
    dispatch({ type: "DELETE_CART", payload: data });
    dispatch({ type: "DEL_CART", payload: data });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to remove item from cart');
    alert(errorMessage);
  }
}

/**
 * Clear entire cart
 */
export const deleted = () => async (dispatch) => {
  try {
    const config = await createAuthConfig();
    const { data } = await Axios.delete(`${API_BASE_URL}/cart/delete`, config);
    dispatch({ type: "CART_DEL", payload: data });
    dispatch({ type: "DELETE_ALL" });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to clear cart');
    alert(errorMessage);
  }
}

// ==================== CATEGORY MANAGEMENT ACTIONS ====================

/**
 * Add new category
 */
export const addcategory = (categoryData) => async (dispatch) => {
  try {
    const { data } = await Axios.post(`${API_BASE_URL}/category`, categoryData);
    dispatch({ type: "ADDCATEGORY", payload: data });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to add category');
    alert(errorMessage);
  }
}

/**
 * Get all categories
 */
export const getcategory = () => async (dispatch) => {
  try {
    const { data } = await Axios.get(`${API_BASE_URL}/category`);
    dispatch({ type: "CATEGORY", payload: data });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to fetch categories');
    console.error('Error fetching categories:', errorMessage);
  }
}

/**
 * Delete category
 */
export const delcategory = (categoryId) => async (dispatch) => {
  try {
    if (!categoryId) {
      alert('Category ID is required');
      return;
    }

    const { data } = await Axios.delete(`${API_BASE_URL}/category/${categoryId}`);
    dispatch({ type: "DELCATEGORY", payload: data });
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to delete category');
    alert(errorMessage);
  }
}

