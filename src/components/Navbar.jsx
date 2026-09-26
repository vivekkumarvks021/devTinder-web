import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Users, UserRound, LogOut } from "lucide-react";

import { authSelector, logoutUser } from "../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector(authSelector);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();

      sessionStorage.removeItem("lastProtectedRoute");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navClass = ({ isActive }) =>
    isActive ? "btn btn-sm btn-primary" : "btn btn-sm btn-ghost";

  return (
    <div className="navbar sticky top-0 z-40 bg-base-100 px-4 shadow-sm">
      {/* Logo */}

      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Dev<span className="text-primary">Tinder</span>
        </Link>
      </div>

      {/* Desktop Navigation */}

      <div className="hidden items-center gap-1 md:flex">
        <NavLink to="/" end className={navClass}>
          Feed
        </NavLink>

        <NavLink to="/requests" className={navClass}>
          <Heart size={16} />
          Requests
        </NavLink>

        <NavLink to="/connections" className={navClass}>
          <Users size={16} />
          Connections
        </NavLink>
      </div>

      {/* User */}

      <div className="ml-3 flex items-center gap-2">
        <span className="hidden text-sm sm:block">
          Welcome, <span className="font-medium">{user?.firstName}</span>
        </span>

        <div className="dropdown dropdown-end">
          <button
            type="button"
            tabIndex={0}
            className="btn btn-circle btn-ghost avatar"
          >
            <div className="w-10 overflow-hidden rounded-full">
              <img
                src={user?.photoUrl || "/male-avatar.png"}
                alt={`${user?.firstName || "User"} profile`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/male-avatar.png";
                }}
              />
            </div>
          </button>

          <ul
            tabIndex={-1}
            className="menu dropdown-content z-50 mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg"
          >
            <li>
              <Link to="/profile">
                <UserRound size={17} />
                Profile
              </Link>
            </li>

            <li>
              <button type="button" onClick={handleLogout} disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <LogOut size={17} />
                )}
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
