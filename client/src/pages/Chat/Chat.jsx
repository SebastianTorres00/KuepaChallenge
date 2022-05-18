import React, {useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ReactPlayer from "react-player";
import Mensajes from "../../components/mensajes";
import styles from "./styled-components/chat.module.css";
import axios from "axios";
import io from "socket.io-client";
import {saveMessage, setUserListStore, setUserStore} from "../../redux/actions";
import {useNavigate} from "react-router-dom";
let socket = io("http://localhost:27017/");
const Chat = () => {
  const navigate = useNavigate();
  let hoy = new Date();
  let user = useSelector((state) => state.username);
  const hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
  const [messages, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const setNewMessage = (e) => {
    setMessage(e);
  };
  socket.on("message", (message) => {
    setAllMessages([...allMessages, message]);
  });
  socket.on("updateUserList", (usernames) => {
    dispatch(setUserListStore(usernames));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mensaje = {
      usuario: user.usuario,
      hora: hora,
      moderador: user.moderador,
      mensaje: messages,
    };
    saveMessage(mensaje);
    socket.emit("addMessage", mensaje);
    setMessage("");
  };
  let logout = (e) => {
    e.preventDefault();
    socket.emit("removeUserFromList", user);
    dispatch(setUserStore({}));
    navigate("/");
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [allMessages]);
  useEffect(() => {
    socket.emit("addUserToList", user);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.video}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=vRGVnqylO68"
          width="100%"
          height="100%"
          muted
          playing
        />
      </div>
      <div className={styles.chatBox}>
        <button className={styles.chatBoxBtn} onClick={logout}>
          <h4 className={styles.chatBoxTitle}>Cerrar Sesión</h4>
        </button>
        <div className={styles.chatBoxWrawwer}>
          <div className={styles.chatBoxTop}>
            <div className={styles.onlyMenssages}>
              {allMessages.map((isMessage, i) => (
                <div ref={scrollRef}>
                  <Mensajes
                    objectMessage={isMessage}
                    index={i}
                    isMe={user.usuario === isMessage.usuario}
                  />
                </div>
              ))}
            </div>
            <div className={styles.chatBoxBottom}>
              <textarea
                placeholder="Escribi algo..."
                className={styles.chatMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                value={messages}
              ></textarea>
              <button className={styles.btnSend} onClick={handleSubmit}>
                Enviar!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
