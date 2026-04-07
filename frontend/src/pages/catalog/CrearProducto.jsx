import React, { useState } from "react";
import "./utils/styles.css";
import api from "../../utils/api";
import FormularioCrearProducto from "./utils/FormularioCrearProducto";
import DefaultLayout from "../../components/DefaultLayout";
import HeaderUsers from "../users/utils/HeaderUsers";

const CrearProducto = () => {
  const initialForm = {
    name: "",
    description: "",
    price: "",
    category: "",
  };
  const [form, setForm] = useState(initialForm);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...form,
      price: Number(form.price),
    };

    try {
      api.crearData("catalog", dataToSend).then((response) => {
        Swal.fire({
          title: "Pruducto creado con exito!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      });
      setForm(initialForm);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DefaultLayout title={"Crear Producto"}>
      <section className="sectionCrearCita">
        <HeaderUsers component="Crear Producto" />
        <FormularioCrearProducto
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </section>
    </DefaultLayout>
  );
};

export default CrearProducto;
