import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/home/layout/Home";
import Dashboard from "../layouts/dashboard/Dashboard";
import ContactUs from "../pages/contactUs/layout/ContactUs";
import Register from "../pages/register/layout/Register";
import Login from "../pages/login/layout/Login";
import ErrorPage from "../pages/errorpage/Errorpage";
import PrivateRoute from "./PrivateRoute";
import WorkSheet from "../pages/dashboard/work-sheet/layout/WorkSheet";
import PaymentHistory from "../pages/dashboard/payment-history/layout/PaymentHistory";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Mainlayout></Mainlayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
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
    },
    {
        path: 'dashboard',
        element : <PrivateRoute>
            <Dashboard></Dashboard>
        </PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
            path: 'work-sheet',
            element: <WorkSheet></WorkSheet>
        },
        {
            path: 'payment-history',
            element: <PaymentHistory></PaymentHistory>
        }
    ]
    }
])