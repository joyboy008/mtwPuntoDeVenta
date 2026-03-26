import React, { Component } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Error from "./components/error/error";

import CrearCita from "./pages/appointments/CrearCita";
import EditarCita from "./pages/appointments/EditarCita";
import ListarCitas from "./pages/appointments/ListarCitas";
import ListarCitasTerminadas from "./pages/appointments/ListarCitasTerminadas";
import VerCitaTerminada from "./pages/appointments/VerCitaTerminada";
// import EliminarVenta from "./pages/checkout/EliminarVenta";

import CrearProducto from "./pages/catalog/CrearProducto";

import ActualizarUsuario from "./pages/users/ActualizarUsuario";
import CrearUsuario from "./pages/users/CrearUsuarios";
import EliminarUsuario from "./pages/users/EliminarUsuario";
import ListarUsuarios from "./pages/users/ListarUsuarios";

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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/appointment",
    element: <CrearCita />,
    loader: requireAuth(async () => {
      if (!authProvider.checkRoutePermissions("admin")) {
        return redirect("/");
      } else {
        return {};
      }
    }),
  },
  {
    path: "/list-appointments",
    element: <ListarCitas />,
    loader: requireAuth(async () => {
      return {};
    }),
  },
  {
    path: "/list-appointments-end",
    element: <ListarCitasTerminadas />,
    loader: requireAuth(async () => {
      return {};
    }),
  },
  {
    path: "/appointment-end/:id",
    element: <VerCitaTerminada />,
    loader: requireAuth(async () => {
      return {};
    }),
  },
  {
    path: "/appointment/:id",
    element: <EditarCita />,
    loader: requireAuth(async () => {
      return {};
    }),
  },
  {
    path: "/catalog",
    element: <CrearProducto />,
    loader: requireAuth(async () => {
      if (!authProvider.checkRoutePermissions("admin")) {
        return redirect("/");
      } else {
        return {};
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
