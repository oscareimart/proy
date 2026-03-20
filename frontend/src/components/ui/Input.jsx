function Input({
  legend = "Campo",
  detail = "Descripcion del Campo",
  type = "text",
  placeholder = "Aca va el Texto",
  ...props
}) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{legend}</legend>
      <input
        type={type}
        className="input"
        placeholder={placeholder}
        {...props}
      />
      <p className="label">{detail}</p>
    </fieldset>
  );
}

export default Input;
