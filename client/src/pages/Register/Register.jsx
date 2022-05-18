import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styles from "./styled-components/Register.module.css";
import io from "socket.io-client";
import {
  register,
  setErrorHandling,
  setLoading,
  setUserStore,
} from "../../redux/actions";
let socket = io("http://localhost:27017/");
const Register = ({onClick}) => {
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.errorDetected);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    usuario: "",
    password: "",
    samePassword: "",
    moderador: false,
  });

  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
  };
  const nextPage = () => {
    if (form.usuario && form.password && form.samePassword) {
      form.password === form.samePassword
        ? registerFunction(form)
        : alert("Las contrasñas deben coincidir");
    } else {
      alert("Campos incompletos");
    }
  };

  useEffect(() => {
    if (!loading && !error) {
      socket.emit("addUserToList", form);
      navigate("/home");
      dispatch(setLoading(false));
      dispatch(setErrorHandling(true));
    }
  }, [loading, error]);
  // Redux

  const dispatch = useDispatch();
  const registerFunction = async (newUser) => {
    dispatch(setLoading(true));
    let responseRegister = await register(newUser);
    if (responseRegister) {
      dispatch(setUserStore(responseRegister));
      dispatch(setLoading(false));
      dispatch(setErrorHandling(false));
    } else {
      dispatch(setLoading(false));
      dispatch(setErrorHandling(true));
      alert("Error, intente nuevamente o con un usuario distinto");
      console.log("ERROR", responseRegister, error);
    }
  };

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
          className={styles.inputs}
          type="password"
          name="password"
          onChange={handleChange}
        ></input>
        <label className={styles.labelForm}>Repeti contraseña</label>
        <input
          placeholder="Repeti contraseña"
          className={styles.inputs}
          type="password"
          name="samePassword"
          onChange={handleChange}
        ></input>
        <select
          name="select"
          className={styles.selectForm}
          onChange={(e) =>
            setForm({...form, moderador: e.target.value ? true : false})
          }
        >
          <option value={false}>Estudiante</option>
          <option value={true}>Moderador</option>
        </select>
      </form>
      <button className={styles.btnHome} onClick={nextPage}>
        Registrarse
      </button>
      <button className={styles.subBtn} onClick={onClick}>
        Login
      </button>
    </>
  );
};

export default Register;
