import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import getCookie from "./hooks/getCookie";
import { useUserContext } from "./context/UserContext";
import Layout from "./components/Layout/Layout";
import CreateExam from "./components/Admin/Exam/CreateExam";


function App() {
  const { fetchProfile } = useUserContext();
  const navigate = useNavigate();
  const cookie = getCookie("token")

  useEffect(() => {
    if (!cookie) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div>

      <CreateExam />
      <Outlet />
    </div>
  );
}

export default App;
