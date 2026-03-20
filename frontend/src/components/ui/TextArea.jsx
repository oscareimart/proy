function TextArea({
  legend = "Campo",
  detail = "Descripcion del Campo",
  type = "text",
  placeholder = "Aca va el Texto",
  ...props
}) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{legend}</legend>
      <textarea
        type={type}
        className="textarea h-24"
        placeholder={placeholder}
        {...props}
      />
      <p className="label">{detail}</p>
    </fieldset>
  );
}

export default TextArea;
