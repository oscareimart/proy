import QRCode from "qrcode";

// With promises
// QRCode.toDataURL("I am a pony!")
//   .then((url) => {
//     console.log(url);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// With async/await
const generateQR = async (text) => {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 300,
    });
  } catch (err) {
    throw new Error("No se pudo generar el codigo QR.");
  }
};

export default generateQR;
