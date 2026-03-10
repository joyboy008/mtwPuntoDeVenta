import { Component } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import FormularioClient from "../../components/FormularioClient";
import api from "../../utils/api";
import Swal from "sweetalert2";

class CrearClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nit: "",
      phone: "",
      address: "",
      email: "",
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    api
      .crearData("clientes", this.state)
      .then((response) => {
        Swal.fire({
          title: "Cliente creado con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <DefaultLayout title="Clientes">
        <FormularioClient
          data={this.state}
          title="Registrar nuevo cliente"
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        ></FormularioClient>
      </DefaultLayout>
    );
  }
}

export default CrearClient;
