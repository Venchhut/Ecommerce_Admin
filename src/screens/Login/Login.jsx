import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/api/user/login", {
        email,
        password,
      });
      if (res.data.token) {
        Cookies.set("token", res.data.token);
        toast.success("Login successful!", {
          position: "top-center",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      toast.error(
        "Login failed! Please check your credentials and try again.",
        {
          position: "top-center",
        }
      );
    }
  };

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      width: "100vw",
    },
    formContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
      boxSizing: "border-box",
    },
    form: {
      width: "100%",
      maxWidth: "500px",
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "15px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
    },
    title: {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "24px",
    },
    imageContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.form}>
          <h2 style={styles.title}>Login to your account</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
        </div>
      </div>
      <div style={styles.imageContainer}>
        <img
          src="https://img.freepik.com/free-photo/set-various-digital-devices_23-2147864697.jpg?t=st=1716828298~exp=1716831898~hmac=f9acbecff3f0ccc93db15237e7de58466c8177831a49481e7409eedbd8889841&w=996"
          alt="Login"
          style={styles.image}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
