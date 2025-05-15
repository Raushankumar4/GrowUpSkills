import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { router } from "./Routes/Router.jsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(


  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </UserProvider>
    </AuthProvider>
  </StrictMode>

);
