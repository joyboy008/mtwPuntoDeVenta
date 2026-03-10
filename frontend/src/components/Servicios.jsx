// Se utiliza en Home

import { Fragment, Component } from "react";
import Servicio from "./Servicio";
import nosotros from "../assets/images/logo-mtw.png";
import punto from "../assets/images/punto de venta.png";
import react from "../assets/images/react.png";
import consultoria from "../assets/images/consultoria-IT.png";

class Servicios extends Component {
  state = {
    servicios: [
      {
        titulo: "Nosotros",
        details:
          "Nos especializamos en ofrecer soluciones tecnológicas innovadoras y personalizadas para mejorar la eficiencia y productividad de tu negocio. Creemos en la importancia de la tecnología como motor de cambio y estamos dedicados a impulsar el crecimiento y éxito de nuestros clientes mediante la implementación de soluciones tecnológicas de vanguardia.",
        image: nosotros,
      },
      {
        titulo: "Desarrollo Web",
        details:
          "Nuestro servicio de Desarrollo Web abarca desde la creación de páginas web informativas hasta complejas aplicaciones web interactivas. Utilizamos las últimas tecnologías y metodologías ágiles para garantizar que cada proyecto sea eficiente, seguro y escalable.",
        image: react,
      },
      {
        titulo: "Sistemas de Punto de Venta",
        details:
          "Nuestro Sistema de Punto de Venta (POS) está diseñado para mejorar la gestión de ventas y operaciones en tu negocio. Es ideal para tiendas minoristas, restaurantes y cualquier establecimiento que necesite un sistema de gestión de ventas eficiente.",
        image: punto,
      },
      {
        titulo: "Consultoría IT",
        details:
          "En Mrln Tech Works, ofrecemos servicios de Consultoría IT para ayudarte a optimizar tus recursos tecnológicos y mejorar la eficiencia operativa de tu negocio.",
        image: consultoria,
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
