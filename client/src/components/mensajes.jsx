import React from "react";
import "./styled-components/mensajes.css";
const Mensajes = ({objectMessage, index, isMe}) => {
  if (typeof objectMessage !== "object") return <></>;
  return (
    <div
      key={index}
      className={isMe ? "ContainerMessage me" : "ContainerMessage"}
    >
      <div className="isAMessage">
        <p className="messageHS">{`${objectMessage.hora} Hs`}</p>
        <label
          className={
            objectMessage.moderador ? "nameMessage mod" : "nameMessage"
          }
        >
          {`${objectMessage.usuario} / ${
            objectMessage.moderador ? "Moderador" : "Estudiante"
          }`}
        </label>
        <p className="message">{objectMessage.mensaje}</p>
      </div>
    </div>
  );
};

export default Mensajes;
