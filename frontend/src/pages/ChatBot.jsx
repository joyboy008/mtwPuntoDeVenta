import React, { Component } from "react";
import ChatBot from "../components/ChatBot/Chatbot";
import DefaultLayout from "../components/DefaultLayout";
import Footer from "../components/Footer";
import { v4 as uuid } from "uuid";
import api from "../utils/api";

class Agendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: "",
      chatId: "",
      chatHistory: [],
    };
  }

  componentDidMount() {
    // Recuperar el chat id y el historial del chat desde localStorage
    const savedChatId = localStorage.getItem("chatId");
    const savedChatHistory = localStorage.getItem("chatHistory");
    const chatId = savedChatId ? savedChatId : uuid();

    this.setState({
      chatId: chatId,
      chatHistory: savedChatHistory ? JSON.parse(savedChatHistory) : [],
    });

    if (!savedChatId) {
      localStorage.setItem("chatId", chatId);
    }
  }

  componentDidUpdate(_, prevState) {
    // Guardar el historial del chat en localStorage cada vez que cambie
    if (prevState.chatHistory !== this.state.chatHistory) {
      localStorage.setItem(
        "chatHistory",
        JSON.stringify(this.state.chatHistory)
      );
    }
  }

  handleInputChange = (event) => {
    this.setState({ chatInput: event.target.value });
  };

  handleEnviarMensaje = () => {
    if (!!this.state.chatInput) {
      let chatHistoryCopy = this.state.chatHistory.slice();
      const userInput = this.state.chatInput;
      chatHistoryCopy.push({ author: "user", input: this.state.chatInput });
      this.setState(
        {
          chatHistory: chatHistoryCopy,
          chatInput: "",
        },
        () => {
          api
            .chat(userInput, this.state.chatId)
            .then((response) => {
              const chatHistoryCopy = this.state.chatHistory.slice();
              chatHistoryCopy.push({
                author: "chatbot",
                input: response.data.mensaje,
              });
              this.setState({ chatHistory: chatHistoryCopy });
            })
            .catch((err) => console.log(err));
        }
      );
    }
  };

  handleNuevaConversacion = () => {
    const newChatId = uuid();
    this.setState({
      chatInput: "",
      chatId: newChatId,
      chatHistory: [],
    });
    localStorage.setItem("chatId", newChatId);
    localStorage.removeItem("chatHistory");
  };

  render() {
    return (
      <React.Fragment>
        <DefaultLayout
          title="Chatea con nosotros 😁"
          size="slider-small"
          showSidebar
        >
          <div className="center">
            <div id="content">
              <div className="py-4">
                <h3>Prueba nuestro Chat Bot.</h3>
                <ChatBot
                  onSendMessage={this.handleEnviarMensaje}
                  chatHistory={this.state.chatHistory}
                  onChange={this.handleInputChange}
                  chatInput={this.state.chatInput}
                  onNewConversation={this.handleNuevaConversacion}
                />
              </div>
            </div>
          </div>
        </DefaultLayout>
        <div className="clearfix"></div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Agendar;
