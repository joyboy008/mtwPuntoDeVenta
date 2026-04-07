import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

export const CardsProducts = ({ product }) => {
  return (
    <div className="card-user">
      <div className="content-user">
        <div>
          <span className="title">{product.name}</span>
        </div>

        <div className="desc">
          Servicio: {product.category} <br />
          Precio: {product.price} <br />
          Descripción: {product.description}
        </div>
        <div>
          <NavLink className="dropbtn succes" to={`/catalog/${product.id}`}>
            Editar
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CardsProducts;
