import React, { Component } from "react";
import DefaulLayout from "../components/DefaultLayout";
import Footer from "../components/Footer";
import FormularioInfo from "../components/FormularioInfo";

class Contacto extends Component {
  render() {
    return (
      <React.Fragment>
        <DefaulLayout title="Contácto" size="slider-small" showSidebar>
          <div className="center">
            <div id="content" className="py-4">
              {/* <h3>Sé nuestro primer cliente</h3> */}
              <br />
              <FormularioInfo
                title={"Pronto estaremos en contácto 😉"}
              ></FormularioInfo>
            </div>
          </div>
        </DefaulLayout>
        <div className="clearfix"></div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Contacto;
