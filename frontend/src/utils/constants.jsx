export const BASE_URL = "http://localhost:8000";
// export const BASE_URL = "https://apimtw.mralda.net";

export const Roles = {
  ADMIN: "admin",
  MODERADOR: "moderador",
};

export const services = [
  { value: "nails", label: "💅 Uñas Acrílicas" },
  { value: "lashes", label: "👁️ Lashes" },
  { value: "otro", label: "➕ Otra" },
  { value: "makeup", label: "😎 Make Up" },
];

export const CATEGORIES = [
  { value: "nails", label: "Nails" },
  { value: "makeup", label: "Makeup" },
  { value: "lashes", label: "Lashes" },
  { value: "otro", label: "Otro" },
];

export const STATUSES_ALLOWED_FOR_QUOTATION = ["agendada", "en_proceso"];

export const STATUS_TRANSITIONS = {
  agendada: [
    { value: "en_proceso", label: "Iniciar atención" },
    { value: "cancelada", label: "Cancelar cita" },
  ],
  en_proceso: [{ value: "finalizada", label: "Finalizar cita" }],
  finalizada: [],
  cancelada: [],
};

export const STATUS_LABELS = {
  agendada: "Agendada",
  en_proceso: "En proceso",
  finalizada: "Finalizada",
  cancelada: "Cancelada",
};

export const STATUS_COLORS = {
  agendada: "status-agendada",
  en_proceso: "status-en-proceso",
  finalizada: "status-finalizada",
  cancelada: "status-cancelada",
};
