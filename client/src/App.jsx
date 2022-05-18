import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import styles from "./pages/Home/styled-components/Home.module.css";
import Chat from "./pages/Chat/Chat";

export default function App() {
  return (
    <div className={styles.firstDiv}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Chat />} />
      </Routes>
    </div>
  );
}
