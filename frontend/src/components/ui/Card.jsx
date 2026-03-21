function Card({ imgBase64 = "", textDescription = "Texto descriptivo de QR" }) {
  const handleDownload = (base64String, fileName) => {
    const link = document.createElement("a");
    link.href = base64String;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="card bg-base-100 w-full shadow-sm mt-6">
      <figure className="w-60 h-60 self-center">
        <img
          src={`${imgBase64}`}
          className="w-full h-full object-contain"
          alt="QR"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Imagen QR</h2>
        <p>
          <b>Vista Previa: </b>
          {textDescription}
        </p>
        <div className="card-actions justify-end">
          <button
            className="btn"
            onClick={() => handleDownload(imgBase64, "qr-image")}
          >
            Descargar
          </button>
          {/* <button className="btn">Compartir</button> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
