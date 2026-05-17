export const maskCardNumber = (card) => {
  const cleaned = card.replace(/\s/g, "");

  return cleaned.slice(0, 6) + "******" + cleaned.slice(cleaned.length - 4);
};

export const maskCVV = () => "***";
