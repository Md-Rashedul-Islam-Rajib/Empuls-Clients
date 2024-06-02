import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/home/layout/Home";
import Dashboard from "../pages/dashboard/layout/Dashboard";
import ContactUs from "../pages/contactUs/layout/ContactUs";
import Register from "../pages/register/layout/Register";
import Login from "../pages/login/layout/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Mainlayout></Mainlayout>,
        errorElement: <h1>Error</h1>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/dashboard',
                element : <Dashboard></Dashboard>
            },
            {
                path: '/contact-us',
                element: <ContactUs></ContactUs>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])