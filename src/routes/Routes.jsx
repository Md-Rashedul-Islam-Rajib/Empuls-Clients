import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/home/layout/Home";
import Dashboard from "../pages/dashboard/layout/Dashboard";
import ContactUs from "../pages/contactUs/layout/ContactUs";

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
            }
        ]
    }
])