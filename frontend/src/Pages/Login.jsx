import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginUser(form);

      localStorage.setItem("token", response.token);

      localStorage.setItem("user", JSON.stringify(response.user));

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-cyan-600">MegaMart</h1>

          <h2 className="mt-4 text-xl font-bold">Welcome Back</h2>

          <p className="mt-1 text-sm text-gray-500">
            Login to continue shopping.
          </p>
        </div>

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
              type="password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-cyan-600 py-3 font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-300"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-cyan-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
