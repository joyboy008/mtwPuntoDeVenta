import { useState } from "react";
import "./styles-checkout.css";
import Slider from "../Slider";

const Checkout = ({
  selectedClient,
  selectedProducts,
  handleConfirmSale,
  sendDetailsToCreateSale,
}) => {
  const [detailsSale, setDetailsSale] = useState("");
  const handleInputChange = (e) => {
    setDetailsSale(e.target.value);
    sendDetailsToCreateSale(e.target.value);
  };
  const totalToPay = selectedProducts
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      {selectedClient && (
        <p className="client-info">
          Cliente: <code>{selectedClient.name}</code>
        </p>
      )}
      <ul className="product-list">
        {selectedProducts.map((product) => (
          <li key={product.id} className="product-item">
            {product.quantity} | {product.name} | Total: Q
            {(product.price * product.quantity).toFixed(2)} ✔️
          </li>
        ))}
      </ul>

      {selectedClient && selectedProducts.length > 0 && (
        <>
          <textarea
            className="textarea__checkout"
            name="details_sale"
            value={detailsSale}
            placeholder="Detalle de venta..."
            onChange={handleInputChange}
          />
          <div className="checkout-summary">
            <h3>
              Total a Pagar: <span>Q{totalToPay}</span>
            </h3>
            <button className="dropbtn succes" onClick={handleConfirmSale}>
              Confirmar Venta
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
