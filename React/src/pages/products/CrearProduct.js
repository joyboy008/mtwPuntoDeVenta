import { Component } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import FormularioProduct from "../../components/FormularioProduct";
import api from "../../utils/api";
import Swal from "sweetalert2";

class CrearProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      category: "",
      stock: "",
      description: "",
      price: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    api
      .crearData("productos", this.state)
      .then((response) => {
        Swal.fire({
          title: "Producto creado con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <DefaultLayout title="Productos">
        <FormularioProduct
          data={this.state}
          title="Ingresar nuevo producto"
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        ></FormularioProduct>
      </DefaultLayout>
    );
  }
}

export default CrearProduct;
