import { createBrowserRouter } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/home";
import Interview from "./features/interview/pages/interview";

export const router = createBrowserRouter([
  {
    path: "/login/*",
    element: (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}
      >
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/register"
          forceRedirectUrl="/"
        />
      </div>
    ),
  },
  {
    path: "/register/*",
    element: (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}
      >
        <SignUp
          routing="path"
          path="/register"
          signInUrl="/login"
          forceRedirectUrl="/"
        />
      </div>
    ),
  },
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/interview/:interviewId",
    element: (
      <Protected>
        <Interview />
      </Protected>
    ),
  },
]);
