function TextArea({
  legend = "Campo",
  detail = "Descripcion del Campo",
  type = "text",
  placeholder = "Aca va el Texto",
  ...props
}) {
  return (
    <fieldset className="field-block">
      <legend className="field-legend">{legend}</legend>
      <textarea
        type={type}
        className="field-textarea"
        placeholder={placeholder}
        {...props}
      />
      <p className="field-detail">{detail}</p>
    </fieldset>
  );
}

export default TextArea;
