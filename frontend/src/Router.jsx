import React, { Component } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import ChatBot from "./pages/ChatBot";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Error from "./components/error";

import CrearProduct from "./pages/products/CrearProduct";
import ListarProducts from "./pages/products/ListarProducts";
import ActualizarProduct from "./pages/products/ActualizarProduct";
import EliminarProduct from "./pages/products/EliminarProduct";

import ActualizarUsuario from "./pages/users/ActualizarUsuario";
import CrearUsuario from "./pages/users/CrearUsuarios";
import EliminarUsuario from "./pages/users/EliminarUsuario";
import ListarUsuarios from "./pages/users/ListarUsuarios";

import CrearClient from "./pages/clients/CrearClient";
import ActualizarClient from "./pages/clients/ActualizarClient";
import ListarClients from "./pages/clients/ListarClients";
import EliminarClient from "./pages/clients/EliminarClient";

import CrearVenta from "./pages/checkout/CrearVenta";
import DetalleVenta from "./pages/checkout/DetalleVenta";
import ListarVentas from "./pages/checkout/ListarVentas";
import EliminarVenta from "./pages/checkout/EliminarVenta";

import api from "./utils/api";
import authProvider from "./utils/AuthProvider";

function requireAuth(loader) {
  return async (params) => {
    if (!authProvider.checkAuth()) {
      return redirect("/login");
    }
    return loader(params);
  };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chatbot",
    element: <ChatBot />,
  },
  {
    path: "/contacto",
    element: <Contacto />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/new_client",
    element: <CrearClient />,
    loader: requireAuth(async () => {
      return {};
    }),
  },
  {
    path: "/clientes",
    element: <ListarClients />,
    loader: requireAuth(async () => {
      return {};
    }),
  },
  {
    path: "/clientes/:clientId",
    element: <ActualizarClient />,
    loader: requireAuth(async ({ params }) => {
      const response = await api.getData("clientes", params.clientId);
      return response.data;
    }),
  },
  {
    path: "/clientes/delete/:clientId",
    element: <EliminarClient />,
    loader: requireAuth(async ({ params }) => {
      if (!authProvider.checkRoutePermissions("admin")) {
        return redirect("/");
      } else {
        const response = await api.getData("clientes", params.clientId);
        if (!response.data) {
          return redirect("/clients");
        }
        return response.data;
      }
    }),
  },
  {
    path: "/new_product",
    element: <CrearProduct />,
    loader: requireAuth(async () => {
      if (!authProvider.checkRoutePermissions("admin")) {
        return redirect("/");
      } else {
        return {};
      }
    }),
  },
  {
    path: "/productos",
    element: <ListarProducts />,
    loader: requireAuth(async () => {
      return {};
    }),
  },
  {
    path: "/productos/:productId",
    element: <ActualizarProduct />,
    loader: requireAuth(async ({ params }) => {
      const response = await api.getData("productos", params.productId);
      return response.data;
      // return json(response.data, { status: 200 });
    }),
  },
  {
    path: "/productos/delete/:productId",
    element: <EliminarProduct />,
    loader: requireAuth(async ({ params }) => {
      if (!authProvider.checkRoutePermissions("admin")) {
        return redirect("/");
      } else {
        const response = await api.getData("productos", params.productId);
        if (!response.data) {
          return redirect("/products");
        }
        return response.data;
      }
    }),
  },
  {
    path: "/new_user",
    element: <CrearUsuario />,
    loader: requireAuth(async () => {
      if (!authProvider.checkRoutePermissions("admin")) {
        return redirect("/");
      } else {
        return {};
      }
    }),
  },
  {
    path: "/checkout",
    element: <CrearVenta />,
    loader: requireAuth(async () => {
      if (!authProvider.checkRoutePermissions("moderador")) {
        return redirect("/");
      } else {
        return {};
      }
    }),
  },
  {
    path: "/sales",
    element: <ListarVentas />,
    loader: requireAuth(async () => {
      if (!authProvider.checkRoutePermissions("moderador")) {
        return redirect("/");
      } else {
        return {};
      }
    }),
  },
  {
    path: "/sales/:saleId",
    element: <DetalleVenta />,
    loader: requireAuth(async ({ params }) => {
      if (!authProvider.checkRoutePermissions("moderador")) {
        return redirect("/");
      } else {
        const response = await api.getData("sales", params.saleId);
        return response.data;
      }
    }),
  },
  {
    path: "/sales/delete/:saleId",
    element: <EliminarVenta />,
    loader: requireAuth(async ({ params }) => {
      if (!authProvider.checkRoutePermissions("admin")) {
        return redirect("/");
      } else {
        const response = await api.getData("sales", params.saleId);
        if (!response.data) {
          return redirect("/sales");
        }
        return response.data;
      }
    }),
  },
  {
    path: "/users",
    element: <ListarUsuarios />,
    loader: requireAuth(async () => {
      if (!authProvider.checkRoutePermissions("admin")) {
        return redirect("/");
      } else {
        return {};
      }
    }),
  },
  {
    path: "/users/:usuarioId",
    element: <ActualizarUsuario />,
    loader: requireAuth(async ({ params }) => {
      if (!authProvider.checkRoutePermissions("admin")) {
        return redirect("/");
      } else {
        const response = await api.getData("users", params.usuarioId);
        return response.data;
      }
    }),
  },
  {
    path: "/users/delete/:usuarioId",
    element: <EliminarUsuario />,
    loader: requireAuth(async ({ params }) => {
      if (!authProvider.checkRoutePermissions("admin")) {
        return redirect("/");
      } else {
        const response = await api.getData("users", params.usuarioId);
        if (!response.data) {
          return redirect("/users");
        }
        return response.data;
      }
    }),
  },
  {
    path: "*",
    element: <Error />,
  },
]);
class Router extends Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export default Router;
