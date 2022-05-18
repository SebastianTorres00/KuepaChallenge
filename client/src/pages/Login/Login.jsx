import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
  login,
  setErrorHandling,
  setLoading,
  setUserStore,
} from "../../redux/actions";

import io from "socket.io-client";

import styles from "./styled-components/Login.module.css";
let socket = io("http://localhost:27017/");

const Login = ({onClick, userOn}) => {
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.errorDetected);
  const [userConected, setUserConected] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    usuario: "",
    contraseña: "",
  });

  let usersConnected = [];
  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
  };
  socket.emit("requestUserList");
  socket.on("getUserList", (userList) => {
    // console.log("---->userList", userList);
    // setUserConected(userList);
    usersConnected = userList;
  });
  const sendLogin = async (e) => {
    e.preventDefault();
    if (!form.usuario || !form.contraseña) {
      alert("Campos vacios");
      return;
    }
    dispatch(setLoading(true));
    console.log("---->usersConnected", usersConnected);
    const isConnected = usersConnected.filter(
      (user) => user.usuario === form.usuario
    );
    console.log("-----> isConnected", isConnected);
    if (isConnected.length) {
      dispatch(setLoading(false));
      dispatch(setErrorHandling(true));
      alert("Usuario ya conectado");
    } else {
      let resLoading = await login(form);
      console.log("----> resLoading", resLoading, form);
      if (resLoading) {
        dispatch(setUserStore(resLoading));
        dispatch(setLoading(false));
        dispatch(setErrorHandling(false));
      } else {
        dispatch(setLoading(false));
        dispatch(setErrorHandling(true));
        alert("Error, intente nuevamente");
        console.log("ERROR", resLoading, error);
      }
    }
  };

  useEffect(() => {
    // console.log("------>", loading, error);
    if (!loading && !error) {
      navigate("/home");
      dispatch(setLoading(false));
      dispatch(setErrorHandling(true));
    }
  }, [loading, error]);

  return (
    <>
      <form className={styles.formLogin}>
        <label className={styles.labelForm}>Usuario</label>
        <input
          placeholder="Usuario"
          className={styles.inputs}
          type="text"
          name="usuario"
          onChange={handleChange}
        ></input>
        <label className={styles.labelForm}>Contraseña</label>
        <input
          placeholder="Contraseña"
          type="password"
          name="contraseña"
          className={styles.inputs}
          onChange={handleChange}
        ></input>
      </form>
      <button className={styles.btnHome} onClick={sendLogin}>
        INICIAR SESION
      </button>
      <button className={styles.subBtn} onClick={onClick}>
        Registrarse
      </button>
    </>
  );
};

export default Login;
