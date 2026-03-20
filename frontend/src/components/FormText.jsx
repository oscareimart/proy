import TextArea from "./ui/TextArea";

function FormText() {
  return (
    <form action="" className="h-full justify-end align-bottom">
      {/* <Input /> */}
      <TextArea
        legend="Texto Plano"
        detail="Introduzca cualquier texto para generar el QR"
        placeholder="Aca va tu Texto Largo..."
      />
      <button className="btn btn-neutral mt-4 w-full">Generar</button>
    </form>
  );
}

export default FormText;
