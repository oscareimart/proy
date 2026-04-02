import Input from "./ui/Input";
import TextArea from "./ui/TextArea";
import { useState } from "react";

function FormChat({ onGenerate, isLoading }) {
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      type: "chat",
      payload: {
        numberPhone: phone.trim(),
        message: text.trim(),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-layout">
      <Input
        detail="Incluye codigo de pais si aplica. Solo digitos."
        legend="Numero de WhatsApp"
        placeholder="59176543120"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        required
        inputMode="numeric"
        pattern="[0-9]{8,15}"
      />
      <TextArea
        detail="El texto se abrira precargado al escanear el codigo."
        legend="Mensaje inicial"
        placeholder="Hola, quiero mas informacion sobre sus servicios."
        onChange={(e) => setText(e.target.value)}
        value={text}
        required
        maxLength={500}
      />
      <button className="primary-button" disabled={isLoading}>
        {isLoading ? "Generando..." : "Generar QR"}
      </button>
    </form>
  );
}

export default FormChat;
