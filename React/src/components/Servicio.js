//Se utiliza en Servicios

import { Component } from "react";

class Servicio extends Component {
  render() {
    const { titulo, details, image } = this.props.servicio;

    return (
      <article className="article-item">
        <div className="article-title">
          <h3>{titulo}</h3>
        </div>
        <div className="article-details">
          <p className="descripcion">{details}</p>
          <img className="imgHome" src={image} alt={titulo} />
        </div>
      </article>
    );
  }
}
export default Servicio;
