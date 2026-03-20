import Input from "./ui/Input";

function FormUrl() {
  return (
    <form action="" className="h-full justify-end align-bottom">
      <Input
        detail="Introduzaca la URL para generar QR"
        legend="URL a redireccionar"
        placeholder="https://example.com/"
      />

      <button className="btn btn-neutral mt-4 w-full">Generar</button>
    </form>
  );
}

export default FormUrl;
