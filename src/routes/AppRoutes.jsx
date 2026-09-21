import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Connections from "../pages/Connections";
import Requests from "../pages/Requests";
import Signup from "../pages/Signup";

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
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
]);

export default appRouter;
