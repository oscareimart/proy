import Input from "./ui/Input";
import { useState } from "react";

function FormUrl({ setTextForConvert }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTextForConvert(text);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full justify-end align-bottom">
      <Input
        detail="Introduzaca la URL para generar QR"
        legend="URL a redireccionar"
        placeholder="https://example.com/"
        onChange={(e) => setText(e.target.value)}
        value={text}
        required
      />

      <button className="btn btn-neutral mt-4 w-full">Generar</button>
    </form>
  );
}

export default FormUrl;
