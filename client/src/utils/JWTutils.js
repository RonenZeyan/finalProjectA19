import { jwtDecode } from 'jwt-decode';

//in this file we emplement a two functions that used for decode the secret token that we get from the backend 

// this function decode the token we get from the backend (to extract a data about the user)
export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

// this function get the userID from the token
export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = decodeToken(token);
    return decoded ? decoded.userID : null;
  }
  return null;
};
