import { createBrowserRouter } from "react-router"
import Login from "./features/auth/Pages/login";
import Register from "./features/auth/Pages/register"


export const router = createBrowserRouter([
    {
        path: "/Login",
        element:<Login/>
    },
    {
        path: "/Register",
        element: <Register/>
    }
])