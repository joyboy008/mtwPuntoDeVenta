import React from "react";
import { FaArrowRight } from "react-icons/fa";
import "./styles.css";

export function LabelCitas({ appointmentsSaved }) {
  return (
    <div className="div-label-cita">
      {appointmentsSaved.map((cita) => (
        <div className="label-cita" key={cita.id}>
          <svg className="svg-icon" width="24" height="24" viewBox="0 0 20 20">
            <FaArrowRight />
          </svg>

          <span className="lable">
            {cita.client_name} | {cita.reason} |{" "}
            {new Date(cita.scheduled_at).toLocaleTimeString("es-GT", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ))}
    </div>
  );
}

export default LabelCitas;
