import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Main from "../layout/main";
import AuthLayout from "../layout/Auth";
import DashboardLayout from "../layout/DashboardLayout";
import AllUser from "../pages/dashboard/all-user/AllUser";
import AllProduct from "../pages/dashboard/products/AllProduct";
import Update from "../pages/dashboard/update-product/Update";
import UpdateUser from "../pages/dashboard/update-users/Update";
import AddItem from "../pages/dashboard/add-item/AddItem";
import DetailsProduct from "../pages/Home/details-product/DetailsProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "auth/register",
        element: <Register />,
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "coffee/:id",
        element: <DetailsProduct />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "users",
        element: <AllUser />,
      },
      {
        path: "users/:id",
        element: <UpdateUser />,
      },
      {
        path: "products",
        element: <AllProduct />,
      },
      {
        path: "products/:id",
        element: <Update />,
      },
      {
        path: "additem",
        element: <AddItem />,
      },
    ],
  },
]);
