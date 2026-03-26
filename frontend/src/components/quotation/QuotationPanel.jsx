import { useCallback, useEffect, useRef, useState } from "react";
import api from "../../utils/api";
import Swal from "sweetalert2";
import "./quotation-styles.css";
import { CATEGORIES, services } from "../../utils/constants";
import FormularioProductoManual from "./FormularioProductoManual";

const EMPTY_ITEM = { name: "", description: "", price: "", category: "" };

function QuotationPanel({ appointmentId }) {
  const [quotation, setQuotation] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Buscador
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Item manual (para categoría "otro" o ajuste de precio)
  const [manualForm, setManualForm] = useState(EMPTY_ITEM);
  const [showManual, setShowManual] = useState(false);
  const resetManual = () => {
    setShowManual(false);
    setManualForm(EMPTY_ITEM);
  };

  // ── Cargar cotización existente ──────────────────────────────────────────
  useEffect(() => {
    api
      .getCotizacionPorCita(appointmentId)
      .then((res) => {
        setQuotation(res.data);
        setItems(res.data.items);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setQuotation(null);
          setItems([]);
        }
      })
      .finally(() => setLoading(false));
  }, [appointmentId]);

  // ── Cerrar resultados al tocar fuera ────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Buscar en catálogo con debounce ─────────────────────────────────────
  useEffect(() => {
    if (!query.trim() && !categoryFilter) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        let res;
        if (query.trim()) {
          res = await api.buscarCatalogo(query.trim());
        } else {
          res = await api.listarData("catalog", { category: categoryFilter });
        }
        // Filtrar por categoría si hay query Y categoría seleccionada
        const filtered = categoryFilter
          ? res.data.filter((s) => s.category === categoryFilter)
          : res.data;
        setResults(filtered);
        setShowResults(true);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, categoryFilter]);

  // ── Total calculado en el cliente ────────────────────────────────────────
  const displayTotal = items.reduce((sum, item) => sum + Number(item.price), 0);

  // ── Agregar desde catálogo ───────────────────────────────────────────────
  const handleSelectFromCatalog = useCallback((service) => {
    setItems((prev) => [
      ...prev,
      {
        name: service.name,
        description: service.description || "",
        price: service.price,
        category: service.category,
      },
    ]);
    setQuery("");
    // setResults([]);
    // setShowResults(false);
  }, []);

  // ── Quitar item ──────────────────────────────────────────────────────────
  const handleRemoveItem = useCallback((index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ── Agregar item manual ──────────────────────────────────────────────────
  const handleManualChange = (e) => {
    const { name, value } = e.target;
    setManualForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddManual = (e) => {
    e.preventDefault();
    if (!manualForm.name || !manualForm.price || !manualForm.category) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Nombre, precio y categoría son requeridos",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (Number(manualForm.price) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Precio inválido",
        text: "El precio debe ser mayor a cero",
        confirmButtonText: "Ok",
      });
      return;
    }
    setItems((prev) => [
      ...prev,
      { ...manualForm, price: Number(manualForm.price) },
    ]);
    setManualForm(EMPTY_ITEM);
    setShowManual(false);
  };

  // ── Guardar cotización ───────────────────────────────────────────────────
  const handleSave = async () => {
    if (items.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Sin servicios",
        text: "Agrega al menos un servicio a la cotización",
        confirmButtonText: "Ok",
      });
      return;
    }

    setSaving(true);
    const payload = {
      appointment_id: appointmentId,
      items: items.map(({ name, description, price, category }) => ({
        name,
        description: description || null,
        price: Number(price),
        category,
      })),
    };

    try {
      const res = quotation
        ? await api.actualizarData("quotations", quotation.id, payload)
        : await api.crearData("quotations", payload);

      setQuotation(res.data);
      setItems(res.data.items);
      Swal.fire({
        icon: "success",
        title: "Cotización guardada",
        confirmButtonText: "Ok",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: err.response?.data?.detail || "Intenta de nuevo",
        confirmButtonText: "Ok",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <p className="quotation-loading">Cargando cotización...</p>;

  return (
    <div className="quotation-panel">
      <h3 className="quotation-title">Cotización</h3>

      {/* ── Filtros de categoría ── */}
      <div className="quotation-categories">
        <button
          type="button"
          className={`cat-pill ${categoryFilter === "" ? "cat-pill--active" : ""}`}
          onClick={() => setCategoryFilter("")}
        >
          Todos
        </button>
        {CATEGORIES.map((categoria) => (
          <button
            key={categoria.value}
            type="button"
            className={`cat-pill ${categoryFilter === categoria.value ? "cat-pill--active" : ""}`}
            onClick={() => setCategoryFilter(categoria.value)}
          >
            {categoria.label}
          </button>
        ))}
      </div>

      {/* ── Buscador de catálogo ── */}
      <div className="quotation-search-wrapper" ref={searchRef}>
        <input
          className="input-citas quotation-search-input"
          type="text"
          placeholder="Buscar servicio del catálogo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
        />
        {searching && <span className="quotation-searching">Buscando...</span>}

        {showResults && results.length > 0 && (
          <ul className="quotation-results">
            {results.map((service) => (
              <li
                key={service.id}
                className="quotation-result-item"
                onClick={() => handleSelectFromCatalog(service)}
              >
                <div className="quotation-result-info">
                  <span className="quotation-item-category">
                    {service.category}
                  </span>
                  <span className="quotation-item-name">{service.name}</span>
                  {service.description && (
                    <span className="quotation-item-desc">
                      {service.description}
                    </span>
                  )}
                </div>
                <span className="quotation-item-price">
                  Q{Number(service.price).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}

        {showResults && results.length === 0 && query.trim() && !searching && (
          <div className="quotation-no-results">
            Sin resultados —{" "}
            <button
              type="button"
              className="quotation-manual-link"
              onClick={() => {
                setShowManual(true);
                setShowResults(false);
              }}
            >
              agregar manualmente
            </button>
          </div>
        )}
      </div>

      {/* ── Formulario manual ── */}
      {showManual && (
        <FormularioProductoManual
          handleAddManual={handleAddManual}
          manualForm={manualForm}
          handleManualChange={handleManualChange}
          resetManual={resetManual}
        />
      )}

      {/* ── Items seleccionados ── */}
      {items.length > 0 && (
        <div className="quotation-items">
          {items.map((item, index) => (
            <div key={index} className="quotation-item">
              <div className="quotation-item-info">
                <span className="quotation-item-category">{item.category}</span>
                <span className="quotation-item-name">{item.name}</span>
                {item.description && (
                  <span className="quotation-item-desc">
                    {item.description}
                  </span>
                )}
              </div>
              <div className="quotation-item-right">
                <span className="quotation-item-price">
                  Q{Number(item.price).toFixed(2)}
                </span>
                <button
                  className="quotation-item-remove"
                  onClick={() => handleRemoveItem(index)}
                  type="button"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <div className="quotation-total">
            <span>Total</span>
            <span>Q{displayTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* ── Botón guardar ── */}
      <button
        className="dropbtn succes quotation-save"
        onClick={handleSave}
        disabled={saving || items.length === 0}
        type="button"
      >
        {saving
          ? "Guardando..."
          : quotation
            ? "Actualizar cotización"
            : "Guardar cotización"}
      </button>
    </div>
  );
}

export default QuotationPanel;
