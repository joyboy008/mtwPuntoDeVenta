// Se utiliza en Home

import { Fragment, Component } from "react";
import Servicio from "./Servicio";
import nosotros from "../assets/images/logo unias mila.png";
import acrilicas from "../assets/images/unias.jpg";
import gel from "../assets/images/gel.jpg";
import pestañas from "../assets/images/lashes.jpg";

class Servicios extends Component {
  state = {
    servicios: [
      {
        titulo: "Nosotros",
        details:
          "Somos un salón de belleza dedicado a resaltar tu estilo y confianza. Nos especializamos en el cuidado estético de manos y mirada, ofreciendo servicios de uñas acrílicas, uñas en gel y extensiones de pestañas. Nuestro compromiso es brindarte una experiencia relajante, profesional y con resultados que te hagan sentir hermosa y segura.",
        image: nosotros,
      },
      {
        titulo: "Uñas Acrílicas",
        details:
          "Realizamos diseños de uñas acrílicas personalizados, desde estilos elegantes y naturales hasta diseños modernos y llamativos. Utilizamos productos de alta calidad para garantizar durabilidad, resistencia y un acabado impecable.",
        image: acrilicas,
      },
      {
        titulo: "Uñas en Gel",
        details:
          "Ofrecemos aplicación de uñas en gel con acabados brillantes y naturales. Ideales para quienes buscan un look delicado y duradero, nuestras técnicas aseguran un resultado ligero, flexible y de larga duración.",
        image: gel,
      },
      {
        titulo: "Extensiones de Pestañas",
        details:
          "Realzamos tu mirada con extensiones de pestañas (lashes) que se adaptan a tu estilo. Desde efecto natural hasta volumen ruso, trabajamos con precisión para lograr una apariencia hermosa, cómoda y duradera.",
        image: pestañas,
      },
    ]
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
