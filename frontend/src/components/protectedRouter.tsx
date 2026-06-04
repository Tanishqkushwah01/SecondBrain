import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const isValidUserSession = () => {
  try {
    const user = localStorage.getItem("user-info");
    if (!user) return false;
    
    const parsedUser = JSON.parse(user);
    const token = parsedUser?.token;
    
    if (!token || !parsedUser?.isLogIn) return false;

    const base64Url = token.split(".")[1];
    if (!base64Url) return false;
    
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);
    
    return payload.exp * 1000 > Date.now();
  } catch (e) {
    return false;
  }
};

export default function ProtectedRoute({ children }: any) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const valid = isValidUserSession();
    setIsAuthenticated(valid);
    setIsChecking(false);
    
    if (!valid) {
      localStorage.removeItem("user-info");
    }
  }, []);

  if (isChecking) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-[#F5F7FA] dark:bg-[#0F172A]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}