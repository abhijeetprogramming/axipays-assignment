import CryptoJS from "crypto-js";

const SECRET_KEY = "AXI2026";

const generateHash = (cardNumber, email) => {
  const cleaned = cardNumber.replace(/\s/g, "");

  const first6 = cleaned.slice(0, 6);
  const last4 = cleaned.slice(-4);

  const combined = first6 + last4;

  const reversedCard = combined.split("").reverse().join("");

  const reversedEmail = email.split("").reverse().join("");

  const message = (reversedEmail + "AXIPAYS" + reversedCard).toUpperCase();

  const hash = CryptoJS.HmacSHA256(message, SECRET_KEY).toString(
    CryptoJS.enc.Hex,
  );

  return hash.toUpperCase();
};

export default generateHash;
