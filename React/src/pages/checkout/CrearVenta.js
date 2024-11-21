import { useState, useCallback } from "react";
import ListarData from "../../components/tables/ListarData";
import api from "../../utils/api";
import authProvider from "../../utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import Swal from "sweetalert2";
import Checkout from "../../components/checkout/Checkout";
import Slider from "../../components/Slider";

function CrearVenta() {
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [detailsSale, setDetailsSale] = useState("");

  const columnsClientes = [
    { label: "Nombre", field: "name" },
    { label: "Teléfono", field: "phone" },
    { label: "Entrega", field: "address" },
    { label: "NIT", field: "nit" },
  ];

  const columnsProductos = [
    { label: "Nombre", field: "name" },
    { label: "Precio", field: "price" },
    { label: "Descripcion", field: "description" },
    { label: "Categoria", field: "category" },
  ];

  const handleAddClient = useCallback(async (clientId) => {
    try {
      const response = await api.getData("clientes", clientId);
      setSelectedClient(response.data);
      Swal.fire({
        title: `${response.data.name} ✔️`,
        showConfirmButton: false,
        timer: 400,
      });
    } catch (error) {
      console.error("Error fetching client:", error);
    }
  }, []);

  const handleAddProduct = useCallback(
    async (productId, cantidad) => {
      try {
        const response = await api.getData("productos", productId);
        const existingProduct = selectedProducts.find(
          (product) => product.id === response.data.id
        );

        if (existingProduct) {
          setSelectedProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === existingProduct.id
                ? { ...product, quantity: product.quantity + cantidad }
                : product
            )
          );
        } else {
          setSelectedProducts((prevProducts) => [
            ...prevProducts,
            { ...response.data, quantity: cantidad },
          ]);
        }
        Swal.fire({
          title: `${response.data.name} ✔️`,
          showConfirmButton: false,
          timer: 400,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    },
    [selectedProducts]
  );

  const handleDetailsSaleChange = (details) => {
    setDetailsSale(details); // Actualiza el estado con los detalles de la venta
    console.log("Detalle de venta:", details); // Opcional: verifica el valor
  };

  const handleConfirmSale = async () => {
    if (!selectedClient || selectedProducts.length === 0) {
      alert(
        "Debe seleccionar un cliente y al menos un producto para realizar la venta."
      );
      return;
    }
    const saleData = {
      client_id: selectedClient.id,
      user_id: authProvider.getUserId(),
      sale_details: detailsSale,
      products: selectedProducts.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
      })),
    };
    try {
      await api.crearData("sales", saleData);
      Swal.fire({
        title: "Venta Realizada con Exito!",
        icon: "success",
        confirmButtonText: "Listo!",
      });
      setSelectedClient(null);
      setSelectedProducts([]);
      navigate("/sales");
    } catch (error) {
      console.error("Error creating sale:", error);
      Swal.fire({
        title: "Error al crear la venta",
        icon: "danger",
        confirmButtonText: "Ok",
      });
    }
  };

  const fetchProductos = useCallback(async () => {
    try {
      const response = await api.listarData("productos");
      return response;
    } catch (err) {
      console.error("Error fetching sales:", err);
      return { data: [] };
    }
  }, []);
  const fetchClientes = useCallback(async () => {
    try {
      const response = await api.listarData("clientes");
      return response;
    } catch (err) {
      console.error("Error fetching sales:", err);
      return { data: [] };
    }
  }, []);
  return (
    <>
      <DefaultLayout title="Ventas">
        <div>
          <Checkout
            selectedClient={selectedClient}
            selectedProducts={selectedProducts}
            handleConfirmSale={handleConfirmSale}
            sendDetailsToCreateSale={handleDetailsSaleChange}
          />
          <Slider title="Productos" size="slider-small" />
          <ListarData
            title="Productos"
            fetchFunction={fetchProductos}
            columns={columnsProductos}
            searchFields={["name", "price", "description", "category"]}
            onAddProduct={handleAddProduct}
            whatIs={"nuevoProducto"}
          />
          <Slider title="Clientes" size="slider-small" />
          <ListarData
            title="Clientes"
            fetchFunction={fetchClientes}
            columns={columnsClientes}
            searchFields={["name", "phone", "address", "nit"]}
            onAddClient={handleAddClient}
            whatIs={"nuevoCliente"}
          />
          <Checkout
            selectedClient={selectedClient}
            selectedProducts={selectedProducts}
            handleConfirmSale={handleConfirmSale}
            sendDetailsToCreateSale={handleDetailsSaleChange}
          />
        </div>
      </DefaultLayout>
    </>
  );
}

export default CrearVenta;
