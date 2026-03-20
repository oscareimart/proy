import Input from "./ui/Input";
import TextArea from "./ui/TextArea";
import { useState } from "react";

function FormChat({ setChatWhatsapp }) {
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setChatWhatsapp({
      numberPhone: phone,
      message: text,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="h-full justify-end align-bottom">
      {/* <Input /> */}
      <Input
        detail="Introduzca el Numero de Whatssapp"
        legend="Nro de Telefono"
        placeholder="76543120"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        required
      />
      <TextArea
        detail="Introduzca el texto para enciar como chat por Whatsapp"
        legend="Texto Chat"
        placeholder="Hola Informacion de..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        required
      />
      <button
        // type="button"
        className="btn btn-neutral mt-4 w-full"
        // onClick={() => handleSubmit()}
      >
        Generar
      </button>
    </form>
  );
}

export default FormChat;
