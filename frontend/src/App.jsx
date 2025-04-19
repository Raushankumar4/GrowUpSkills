
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {

  const token = localStorage.getItem("token")

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token])


  return (

    <>
      <Outlet />
    </>
  );
}

export default App;
