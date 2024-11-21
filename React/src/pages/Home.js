import React, { Component } from "react";
import Servicios from "../components/Servicios";
import DefaulLayout from "../components/DefaultLayout";
import Footer from "../components/Footer";
import FormularioInfo from "../components/FormularioInfo";

class Home extends Component {
  render() {
    // var buttonString = "Nuestros Servicios";
    return (
      <React.Fragment>
        <DefaulLayout
          title="Restaurante Tech Works"
          size="slider-small"
          showSidebar
        >
          <div id="content">
            <Servicios />
            <FormularioInfo
              title={"Pronto estaremos en contácto 😉"}
            ></FormularioInfo>
          </div>

          {/* <ProductList /> */}
        </DefaulLayout>
        <div className="clearfix"></div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Home;
