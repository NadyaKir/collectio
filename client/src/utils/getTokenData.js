import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const getTokenData = () => {
  const token = Cookies.get("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return {
      userId: decodedToken.userId,
      isAdmin: decodedToken.isAdmin,
    };
  }
  return {
    userId: null,
    isAdmin: false,
  };
};

export default getTokenData;
