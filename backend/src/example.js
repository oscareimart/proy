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
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error(err);
  }
};

export default generateQR;
