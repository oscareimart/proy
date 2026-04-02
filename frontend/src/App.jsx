import { useState } from "react";
import axios from "axios";
import Card from "./components/ui/Card.jsx";
import Menu from "./components/ui/Menu.jsx";
import FormChat from "./components/FormChat.jsx";
import FormText from "./components/FormText.jsx";
import FormUrl from "./components/FormUrl.jsx";

const URL_BACKEND = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:3000";
const DEFAULT_QR_IMAGE = "/sinQR.png";

const menuArray = [
  {
    id: "text",
    name: "Texto",
    eyebrow: "Contenido libre",
    description:
      "Convierte notas, mensajes, instrucciones o cualquier texto en un QR listo para compartir.",
    helper:
      "Ideal para menús, credenciales, mensajes rápidos o información que alguien debe escanear al instante.",
    component: FormText,
  },
  {
    id: "url",
    name: "URL",
    eyebrow: "Destino web",
    description:
      "Crea un QR que lleve directo a una página, landing, formulario o recurso digital.",
    helper:
      "Perfecto para campañas, redes sociales, fichas de producto o accesos rápidos desde impresión.",
    component: FormUrl,
  },
  {
    id: "chat",
    name: "WhatsApp",
    eyebrow: "Contacto inmediato",
    description:
      "Genera un QR con mensaje prellenado para abrir una conversación de WhatsApp en un toque.",
    helper:
      "Útil para ventas, soporte, reservas y atención al cliente desde empaques, stands o flyers.",
    component: FormChat,
  },
];

function App() {
  const [menuSelected, setMenuSelected] = useState(menuArray[0]);
  const [imgBase64, setImgBase64] = useState(DEFAULT_QR_IMAGE);
  const [previewText, setPreviewText] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerate = async ({ type, payload }) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      if (type === "chat") {
        const response = await axios.post(`${URL_BACKEND}/qr-whatsapp`, payload);
        setPreviewText(response.data.whatsappLink);
        setImgBase64(response.data.qr);
        setStatus("success");
        return;
      }

      const queryParam = type === "url" ? "url" : "text";
      const response = await axios.get(
        `${URL_BACKEND}/qr?${queryParam}=${encodeURIComponent(payload)}`,
      );

      setPreviewText(payload);
      setImgBase64(response.data.qr);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setImgBase64(DEFAULT_QR_IMAGE);
      setErrorMessage(
        error?.response?.data?.error ??
          "No pudimos generar el QR. Revisa los datos e intenta nuevamente.",
      );
    }
  };

  const handleSelectMenu = (item) => {
    setMenuSelected(item);
    setStatus("idle");
    setErrorMessage("");
  };

  const ComponentFormSelected = menuSelected.component;

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="hero-badge">Generador QR listo para producción</span>
          <h1 className="hero-title">Convierte cualquier acción en un escaneo claro y rápido.</h1>
          <p className="hero-subtitle">
            Diseñamos una interfaz más cómoda para crear códigos QR de texto,
            enlaces y WhatsApp sin fricción, con vista previa inmediata y una
            composición pensada para desktop y móvil.
          </p>

          <div className="hero-stats">
            <div className="hero-stat-card">
              <strong>3 modos</strong>
              <span>Texto, URL y WhatsApp</span>
            </div>
            <div className="hero-stat-card">
              <strong>Vista previa</strong>
              <span>Resultado listo para descargar</span>
            </div>
            <div className="hero-stat-card">
              <strong>Flujo simple</strong>
              <span>Menos pasos, más claridad</span>
            </div>
          </div>
        </div>

        <div className="hero-orbit" aria-hidden="true">
          <div className="hero-orbit-ring"></div>
          <div className="hero-orbit-card">
            <span className="hero-orbit-label">{menuSelected.eyebrow}</span>
            <p>{menuSelected.description}</p>
          </div>
        </div>
      </section>

      <section className="workspace-grid">
        <div className="surface-panel control-panel">
          <div className="section-heading">
            <span className="section-kicker">Configuración</span>
            <h2>Elige el tipo de QR que necesitas</h2>
            <p>
              Cambia de modo sin salir de la pantalla y completa solo los datos
              esenciales.
            </p>
          </div>

          <Menu
            menu={menuArray}
            selectedId={menuSelected.id}
            setMenuSelected={handleSelectMenu}
          />

          <div className="mode-summary">
            <span className="mode-summary-kicker">{menuSelected.eyebrow}</span>
            <h3>{menuSelected.name}</h3>
            <p>{menuSelected.description}</p>
            <small>{menuSelected.helper}</small>
          </div>

          {ComponentFormSelected && (
            <ComponentFormSelected
              onGenerate={handleGenerate}
              isLoading={status === "loading"}
            />
          )}

          {errorMessage ? (
            <div className="feedback-message" role="alert">
              {errorMessage}
            </div>
          ) : null}
        </div>

        <Card
          imgBase64={imgBase64}
          textDescription={previewText}
          status={status}
          menuLabel={menuSelected.name}
        />
      </section>
    </main>
  );
}

export default App;
