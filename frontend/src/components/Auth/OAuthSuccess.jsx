import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    console.log("OAuth token from URL:", token); // 🔍 Debug line

    if (token) {
      localStorage.setItem("token", token);
      navigate("/profile");
    } else {
      navigate("/");
    }
  }, []);

  return <p>Logging you in...</p>;
};

export default OAuthSuccess;
