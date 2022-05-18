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
        <label
          className={
            objectMessage.moderador ? "nameMessage mod" : "nameMessage"
          }
        >
          {`${objectMessage.usuario} / ${
            objectMessage.moderador ? "Moderador" : "Estudiante"
          }`}
        </label>
        <p className="messageHS">{`Hora :  ${objectMessage.hora}`}</p>
        <p className="message">{objectMessage.mensaje}</p>
      </div>
    </div>
  );
};

export default Mensajes;
