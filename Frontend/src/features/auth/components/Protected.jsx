import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
