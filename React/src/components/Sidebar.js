//se utiliza en DefaultLayout

import { Fragment, Component } from "react";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md"; // Importar el ícono de correo electrónico

class Sidebar extends Component {
  render() {
    return (
      <aside id="sidebar">
        {this.props.blog === "true" && (
          <Fragment>
            <div id="nav-blog" className="sidebar-item">
              <h3>Dirección</h3>
              <p>09023 - La Esperanza, Quetzaltenango, Guatemala</p>
              <p>Telefono: +(502) 5031-4174</p>
            </div>
            <div id="search" className="sidebar-item">
              <h3>Redes Sociales</h3>
              <a
                href="https://www.facebook.com/profile.php?id=61562931370711"
                target="_blank"
                rel="noreferrer"
                className="facebook-link"
              >
                <FaFacebook /> {/* Icono de Facebook */}
              </a>
              <a
                href="https://wa.me/50250314174"
                target="_blank"
                rel="noreferrer"
                className="whatsapp-link"
              >
                <FaWhatsapp /> {/* Icono de W */}
              </a>
              <a
                href="https://www.instagram.com/mtechworks?igsh=OHFkYjJhMndtcThx "
                target="_blank"
                rel="noreferrer"
                className="instagram-link"
              >
                <FaInstagram /> {/* Icono de W */}
              </a>
              <a
                href="mailto:mgrrsystems@email.com"
                target="_blank"
                rel="noreferrer"
                className="email-link"
              >
                <MdEmail /> {/* Icono de Email */}
              </a>
            </div>
          </Fragment>
        )}
      </aside>
    );
  }
}

export default Sidebar;
