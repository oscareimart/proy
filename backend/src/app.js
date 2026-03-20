import express from "express";
import generateQR from "./example.js";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());

function validateURL(texto) {
  try {
    new URL(texto);
    return true;
  } catch (err) {
    return false;
  }
}

app.get("/qr", async (req, res) => {
  try {
    const { text, url } = req.query;

    if (!text && !url)
      return res.status(400).json({
        error: "Se require parametro de conversion para crear QR",
      });

    if (url && !validateURL(url))
      return res.status(400).json({
        error: "URL inválida",
      });

    const stringToConvert = text ? text : url;

    const qrBase64 = await generateQR(stringToConvert);

    return res.json({
      ok: true,
      qr: qrBase64,
    });
  } catch (err) {
    res.status(500).send("Error generando QR");
  }
});

app.post("/qr-whatsapp", async (req, res) => {
  const { numberPhone, message } = req.body;

  if (!numberPhone && !message)
    return res.status(400).json({
      error: "Se requiere numero de telefono y mensaje",
    });

  console.log(numberPhone, message);

  try {
    const texto = message || "Te comparto este enlace:";

    const whatsappLink = `https://wa.me/${numberPhone}?text=${encodeURIComponent(
      texto,
    )}`;

    const qrBase64 = await generateQR(whatsappLink);

    res.json({
      ok: true,
      qr: qrBase64,
      message,
      whatsappLink,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error generando QR",
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
