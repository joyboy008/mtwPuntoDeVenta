// Se utiliza en Home

import { Fragment, Component } from "react";
import Servicio from "./Servicio";
import acrilicas from "../assets/images/unias.jpg";
import pestañas from "../assets/images/lashes.jpg";
import makeup from "../assets/images/makeup.jpg";

class Servicios extends Component {
  state = {
    servicios: [
      {
        titulo: "Nails",
        details:
          "Diseños que hablan por sí solos. Desde clásicos atemporales hasta arte en miniatura hecho para ti.",
        image: acrilicas,
        tags: "Uñas · Diseño · Arte",
      },
      {
        titulo: "Make Up",
        details:
          "Realzamos tu belleza natural. Cada trazo, cada tono, pensado para que te veas y te sientas increíble.",
        image: makeup,
        tags: "Natural · Eventos · Glam",
      },
      {
        titulo: "Lashes",
        details:
          "Pestañas que transforman tu mirada. Volumen, longitud y estilo que duran sin esfuerzo diario.",
        image: pestañas,
        tags: "Volumen · Lifting · Extensiones",
      },
    ],
  };

  render() {
    return (
      <Fragment>
        <div className="servicios">
          <div id="articles" className="services">
            {this.state.servicios.map((servicio, i) => {
              return <Servicio key={i} servicio={servicio} indice={i} />;
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Servicios;
