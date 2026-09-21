import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import ScreenLoader from "../components/ScreenLoader";
import { authSelector, loginUser } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        loginUser({
          email,
          password,
        }),
      ).unwrap();
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error || "Login failed");
    }
  };

  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body">
          {/* Heading */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">
              Dev<span className="text-primary">Tinder</span>
            </h1>

            <p className="text-base-content/60 mt-2">
              Connect with developers around you
            </p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>

              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>

            {/* Password */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>

              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>

            {/* Forgot password */}
            <div className="text-right mt-2">
              <button type="button" className="link link-primary text-sm">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn-primary w-full mt-6">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <p className="text-center text-sm">
            New to DevTinder?{" "}
            <Link to="/signup" className="link link-primary font-semibold">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
