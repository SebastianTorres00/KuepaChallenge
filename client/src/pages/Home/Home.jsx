import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import Login from "../Login/Login";
import Register from "../Register/Register";
import io from "socket.io-client";
import styles from "./styled-components/Home.module.css";

const Home = () => {
  const loading = useSelector((state) => state.loading);
  const [registerOrLogin, setRegisterOrLogin] = useState(true);
  const [isLoading, setLoading] = useState(loading);
  const onClick = () => {
    setRegisterOrLogin(!registerOrLogin);
  };
  useEffect(() => {
    io("http://localhost:27017/");
  }, []);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);
  return (
    <div className={styles.divHome}>
      {!isLoading ? (
        <div className={styles.card}>
          <p
            className={
              registerOrLogin ? styles.cardTitle : styles.cardTitleRegister
            }
          >
            Kuepa
          </p>
          <div className={styles.login}>
            {registerOrLogin ? (
              <Login onClick={onClick}></Login>
            ) : (
              <Register onClick={onClick}></Register>
            )}
          </div>
        </div>
      ) : (
        <div>
          <img src="https://i.pinimg.com/originals/b2/d4/b2/b2d4b2c0f0ff6c95b0d6021a430beda4.gif" />
        </div>
      )}
    </div>
  );
};

export default Home;
