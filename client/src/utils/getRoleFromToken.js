import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const getRoleFromToken = () => {
  const token = Cookies.get("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.isAdmin;
  }
  return false;
};

export default getRoleFromToken;
