import { Component } from "react";
import DefaulLayout from "../../components/DefaultLayout";
import FormularioUsuario from "../../components/FormularioUsuario";
import api from "../../utils/api";
import Swal from "sweetalert2";

class CrearUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      role: "",
      image: "",
      cash_register: 0,
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      ...this.state,
      cash_register: Number(this.state.cash_register),
    };
    api
      .crearData("users", data)
      .then((response) => {
        Swal.fire({
          title: "Usuario creado con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        this.setState({
          name: "",
          username: "",
          password: "",
          role: "",
          image: "",
          cash_register: 0,
        });
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <DefaulLayout title="Crear usuario" size="slider-small">
        <FormularioUsuario
          title={"Registrar Usuario"}
          data={this.state}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <br />
      </DefaulLayout>
    );
  }
}

export default CrearUsuario;
