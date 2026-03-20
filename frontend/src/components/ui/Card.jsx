function Card() {
  return (
    <div className="card bg-base-100 w-full shadow-sm mt-6">
      <figure>
        <img src="/qr.png" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Imagen QR
          {/* <div className="badge badge-info">NEW</div> */}
        </h2>
        <p>
          <b>Vista Previa: </b>A card component has a figure, a body part, and
          inside body there are title and actions parts
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
