const formatPrice = (amount: number | null) => {
  if (amount === null) {
    return "Not available";
  }
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount / 100);
};

export default formatPrice;
