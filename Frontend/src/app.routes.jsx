import { createBrowserRouter } from "react-router"
import Login from "./features/auth/Pages/login";
import Register from "./features/auth/Pages/register"
import Protected from "./features/auth/components/Protected";


export const router = createBrowserRouter([
    {
        path: "/Login",
        element:<Login/>
    },
    {
        path: "/Register",
        element: <Register/>
    },
    {
        path: "/",
        element: <Protected><Home/></Protected>
    }
])