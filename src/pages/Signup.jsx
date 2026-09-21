import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../services/auth.service";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: null,
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      age: Number(formData.age),
    };
    try {
      const res = await signup(payload);

      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="card bg-base-100 w-full max-w-lg shadow-xl">
        <div className="card-body">
          {/* Heading */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">
              Dev<span className="text-primary">Tinder</span>
            </h1>

            <p className="text-base-content/60 mt-2">
              Create your developer profile
            </p>
          </div>

          <form onSubmit={handleSignup}>
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>

                <input
                  type="text"
                  name="firstName"
                  className="input input-bordered w-full"
                  placeholder="Vivek"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>

                <input
                  type="text"
                  name="lastName"
                  className="input input-bordered w-full"
                  placeholder="Kumar"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </fieldset>
            </div>

            {/* Email */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>

              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </fieldset>

            {/* Password */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>

              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </fieldset>

            {/* Age + Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>

                <input
                  type="number"
                  name="age"
                  min="18"
                  max="100"
                  className="input input-bordered w-full"
                  placeholder="28"
                  value={formData.age}
                  onChange={handleChange}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>

                <select
                  name="gender"
                  className="select select-bordered w-full"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select gender
                  </option>

                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </fieldset>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full mt-6">
              Create Account
            </button>
          </form>

          <div className="divider">OR</div>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
