import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/Styles.css";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
//                                  npm start
// npm install --save react-router-dom ---> este comando es para instalar los routers
// Importar Router

// Aqui va a iniciar nuesta aplicacion web
// instalamos bootstrap por las tablas unicamente, todo lo demas es css

import Router from "./Router";

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
