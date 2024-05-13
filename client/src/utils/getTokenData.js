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
  return null;
};

export default getTokenData();
