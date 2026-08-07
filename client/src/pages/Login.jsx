import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://leaddesk-mini-6ufe.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      // Backend se mila JWT token save karo
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isAdmin", "true");

      alert("Login Successful");
      navigate("/admin");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="card">
        <h1>🔐 Admin Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;