import Input from "./ui/Input";
import TextArea from "./ui/TextArea";

function FormChat() {
  return (
    <form action="" className="h-full justify-end align-bottom">
      {/* <Input /> */}
      <Input
        detail="Introduzca el Numero de Whatssapp"
        legend="Nro de Telefono"
        placeholder="76543120"
      />
      <TextArea
        detail="Introduzca el texto para enciar como chat por Whatsapp"
        legend="Texto Chat"
        placeholder="Hola Informacion de..."
      />
      <button className="btn btn-neutral mt-4 w-full">Generar</button>
    </form>
  );
}

export default FormChat;
