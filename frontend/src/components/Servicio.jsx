//Se utiliza en Servicios

import { Component } from "react";

class Servicio extends Component {
  render() {
    const { titulo, details, image, tags } = this.props.servicio;

    return (
      <article className="article-item">
        <div className="article-title">
          <h3>{titulo}</h3>
        </div>
        <div className="article-details">
          <p className="descripcion">{details}</p>
          <img className="imgHome" src={image} alt={titulo} />
          {/* <p className="tags">{tags}</p> */}
        </div>
      </article>
    );
  }
}
export default Servicio;
