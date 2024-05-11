import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const useAuth = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(setAuthenticated(true));
    }
  }, [dispatch]);

  const register = async (formData) => {
    try {
      await axios.post("http://localhost:8081/api/auth/register", formData);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message || "An error occurred");
    }
  };

  const signin = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        formData
      );
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });
      dispatch(setAuthenticated(true));
      navigate("/");
    } catch (error) {
      setError(error.response.data.message || "An error occurred");
    }
  };

  const signout = () => {
    Cookies.remove("token");
    dispatch(setAuthenticated(false));
    navigate("/login");
  };

  return { isAuthenticated, error, register, signin, signout };
};

export default useAuth;
