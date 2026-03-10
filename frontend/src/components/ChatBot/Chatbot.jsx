// Se utiliza en ChatBot

import React from "react";
// import { BsFillSendFill } from "react-icons/bs";
import "./chatbot.styles.css";

function ChatBot({
  chatHistory,
  chatInput,
  onChange,
  onSendMessage,
  onNewConversation,
}) {
  return (
    <div className="chat__container">
      <div className="chat__content">
        {chatHistory.length > 0 ? (
          chatHistory.map((message, index) => {
            if (message.author === "chatbot") {
              return (
                <div
                  key={index}
                  className="message__container chatbot__message"
                >
                  <span className="chat__bubble">{message.input}</span>
                </div>
              );
            }
            return (
              <div key={index} className="message__container user__message">
                <span className="chat__bubble">{message.input}</span>
              </div>
            );
          })
        ) : (
          <div>
            <span>No hay mensajes aún.</span>
            <p className="chatbot-p">
              Inicia una conversación con nuestro chatbot impulsado por
              tecnología <span>ChatGPT</span>, listo para ayudarte con consultas
              de cualquier ámbito.
            </p>
          </div>
        )}
      </div>
      <div className="chat__input-container">
        <input
          placeholder="Escribe..."
          type="text"
          name="chatInput"
          value={chatInput}
          onChange={onChange}
        />
        <button className="btn btn-mrln" onClick={onSendMessage}>
          {/* <BsFillSendFill /> */}
          Enter
        </button>
        <button className="btn btn-mrln" onClick={onNewConversation}>
          Nuevo Chat
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
