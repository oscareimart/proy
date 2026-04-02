function Input({
  legend = "Campo",
  detail = "Descripcion del Campo",
  type = "text",
  placeholder = "Aca va el Texto",
  ...props
}) {
  return (
    <fieldset className="field-block">
      <legend className="field-legend">{legend}</legend>
      <input
        type={type}
        className="field-input"
        placeholder={placeholder}
        {...props}
      />
      <p className="field-detail">{detail}</p>
    </fieldset>
  );
}

export default Input;
