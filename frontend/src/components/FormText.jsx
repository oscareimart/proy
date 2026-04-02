import { useState } from "react";
import TextArea from "./ui/TextArea";

function FormText({ onGenerate, isLoading }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      type: "text",
      payload: text.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-layout">
      <TextArea
        legend="Texto"
        detail="Escribe el contenido que deseas convertir en QR."
        placeholder="Ejemplo: horario de atencion, instrucciones, codigo de acceso..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        required
        maxLength={1024}
      />
      <button className="primary-button" disabled={isLoading}>
        {isLoading ? "Generando..." : "Generar QR"}
      </button>
    </form>
  );
}

export default FormText;
