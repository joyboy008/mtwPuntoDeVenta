import { Roles } from "./constants";

const key = "session";

const authProvider = {
  saveSession: (session) => {
    localStorage.setItem(key, JSON.stringify(session));
  },

  getAuthHeaders: () => {
    const _session = localStorage.getItem(key);
    const session = JSON.parse(_session);
    return {
      authorization: `Bearer ${session.token}`,
    };
  },

  getSession: () => {
    return localStorage.getItem(key);
  },
  checkAuth: () => {
    const session = JSON.parse(localStorage.getItem(key));

    return !!session?.token;
  },
  getUsuario: () => {
    const session = JSON.parse(localStorage.getItem(key));
    return session ? session.user : null;
  },
  getUserId: () => {
    const session = JSON.parse(localStorage.getItem(key));
    return session && session.user ? session.user._id : null;
  },

  checkRoutePermissions: (route) => {
    const _session = localStorage.getItem(key);
    if (!_session) {
      return false;
    }
    const {
      user: { role },
    } = JSON.parse(_session);
    if (route === "moderador") {
      if (role === Roles.ADMIN || role === Roles.MODERADOR) {
        return true;
      }
      return false;
    } else if (route === "admin") {
      if (role === Roles.ADMIN) {
        return true;
      }
      return false;
    }

    return false;
  },
  deleteSession: () => {
    localStorage.removeItem(key);
  },
};

export default authProvider;
