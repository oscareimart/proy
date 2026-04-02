function Card({
  imgBase64 = "",
  textDescription = "",
  status = "idle",
  menuLabel = "QR",
}) {
  const handleDownload = (base64String, fileName) => {
    const link = document.createElement("a");
    link.href = base64String;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const canDownload = imgBase64 && !imgBase64.endsWith("/sinQR.png");
  const helperTextByStatus = {
    idle: "Completa el formulario para ver aqui tu codigo QR listo para descargar.",
    loading: "Estamos generando tu codigo. La vista previa aparecera en unos segundos.",
    success: "Tu codigo ya esta listo. Puedes descargarlo y usarlo donde necesites.",
    error: "No se pudo generar el codigo con esos datos. Revisa la informacion e intenta otra vez.",
  };

  return (
    <aside className="surface-panel preview-panel">
      <div className="preview-header">
        <div>
          <span className="section-kicker">Vista previa</span>
          <h2>{menuLabel} listo para compartir</h2>
        </div>
        <span className={`status-pill is-${status}`}>{status}</span>
      </div>

      <div className={`preview-frame ${status === "loading" ? "is-loading" : ""}`}>
        <img src={imgBase64} className="preview-image" alt="QR generado" />
      </div>

      <div className="preview-content">
        <p className="preview-helper">{helperTextByStatus[status]}</p>
        <div className="preview-copy-block">
          <span className="preview-label">Contenido vinculado</span>
          <p>{textDescription || "Todavia no has generado un codigo en esta sesion."}</p>
        </div>

        <div className="preview-actions">
          <button
            className="secondary-button"
            onClick={() => handleDownload(imgBase64, "qr-image")}
            disabled={!canDownload}
            type="button"
          >
            Descargar
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Card;
