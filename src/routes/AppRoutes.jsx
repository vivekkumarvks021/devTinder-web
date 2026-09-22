import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Connections from "../pages/Connections";
import Requests from "../pages/Requests";
import Signup from "../pages/Signup";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";
import ErrorBoundaryPage from "../pages/ErrorBoundaryPage";
import PageNotFound from "../pages/PageNotFound";

const appRouter = createBrowserRouter([
  {
    element: <GuestRoute />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Feed />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "connections",
            element: <Connections />,
          },
          {
            path: "requests",
            element: <Requests />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default appRouter;
