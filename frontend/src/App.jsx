import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserContext } from "./context/UserContext";
import Navbar from "./components/Navbar/Navbar";
import getCookie from "./hooks/getCookie";
import UpdateProfile from "./components/User/UpdateProfile";

function App() {
  const { userData } = useUserContext();
  const navigate = useNavigate();
  const cookie = getCookie("token")

  useEffect(() => {
    if (!cookie) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
