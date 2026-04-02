import Input from "./ui/Input";
import { useState } from "react";

function FormUrl({ onGenerate, isLoading }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      type: "url",
      payload: text.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-layout">
      <Input
        detail="Usa una direccion completa con http:// o https://."
        legend="URL de destino"
        placeholder="https://example.com/"
        onChange={(e) => setText(e.target.value)}
        value={text}
        required
      />

      <button className="primary-button" disabled={isLoading}>
        {isLoading ? "Generando..." : "Generar QR"}
      </button>
    </form>
  );
}

export default FormUrl;
