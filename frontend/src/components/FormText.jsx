import { useState } from "react";
import TextArea from "./ui/TextArea";

function FormText({ setTextForConvert }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTextForConvert(text);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full justify-end align-bottom">
      {/* <Input /> */}
      <TextArea
        legend="Texto Plano"
        detail="Introduzca cualquier texto para generar el QR"
        placeholder="Aca va tu Texto Largo..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        required
      />
      <button className="btn btn-neutral mt-4 w-full">Generar</button>
    </form>
  );
}

export default FormText;
