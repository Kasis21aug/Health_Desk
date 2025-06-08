import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/login",
          { email, password, confirmPassword, role: "Admin" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="container form-component">
        <img src="/logo1.png" alt="logo" className="logo" />
        <h1 className="form-title">WELCOME TO HEALTH DESK</h1>
        <p>Only Admins Are Allowed To Access These Resources!</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;


// import React, { useContext, useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Context } from "../main";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loginRole, setLoginRole] = useState("Admin"); // Default login role

//   const { isAuthenticated, setIsAuthenticated, setRole } = useContext(Context);
//   const navigateTo = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/user/login",
//         { email, password, confirmPassword, role: loginRole },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       toast.success(data.message);
//       setIsAuthenticated(true);

//       // Get logged-in user info
//       const userResponse = await axios.get("http://localhost:4000/api/v1/user/me", {
//         withCredentials: true,
//       });

//       setRole(userResponse.data.user.role);

//       // Redirect based on role
//       if (userResponse.data.user.role === "Admin") {
//         navigateTo("/admin/dashboard");
//       }

//       // Reset form
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     }
//   };

//   if (isAuthenticated) {
//     return <Navigate to="/" />;
//   }

//   return (
//     <section className="container form-component">
//       <img src="/logo1.png" alt="logo" className="logo" />
//       <h1 className="form-title">WELCOME TO HEALTHDESK</h1>
//       <p>Only Admins Can Access These Resources!</p>

//       <form onSubmit={handleLogin}>
//         <select value={loginRole} onChange={(e) => setLoginRole(e.target.value)}>
//           <option value="Admin">Admin</option>
//           //<o value="Doctor">Doctor</o
//         </select>

//         <input
//           type="text"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />

//         <div style={{ justifyContent: "center", alignItems: "center" }}>
//           <button type="submit">Login</button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default Login;
