function Card({ imgBase64, textDescription = "Texto descriptivo de QR" }) {
  console.log(imgBase64);

  return (
    <div className="card bg-base-100 w-full shadow-sm mt-6">
      <figure className="w-60 h-60 self-center">
        {/* <img src="/qr.png" alt="Shoes" /> */}
        <img
          src={`${imgBase64}`}
          className="w-full h-full object-contain"
          alt="QR"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Imagen QR
          {/* <div className="badge badge-info">NEW</div> */}
        </h2>
        <p>
          <b>Vista Previa: </b>
          {textDescription}
        </p>
        <div className="card-actions justify-end">
          <button className="btn">Descargar</button>
          {/* <button className="btn">Compartir</button> */}
          <button className="btn">Compartir</button>
          {/* <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
