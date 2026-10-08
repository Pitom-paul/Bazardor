export function toBengaliNumber(value) {
  const numbers = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };

  return String(value).replace(/[0-9]/g, (digit) => numbers[digit]);
}

export function getNumericPrice(product) {
  const price =
    product?.price ??
    product?.currentPrice ??
    product?.todayPrice ??
    product?.avgPrice ??
    0;

  if (typeof price === "number") {
    return price;
  }

  return Number(String(price).replace(/[^\d.]/g, "")) || 0;
}

export function getChange(product) {
  return (
    product?.change ??
    product?.changePercent ??
    product?.percentage ??
    product?.priceChange ??
    0
  );
}

export function getProductName(product) {
  return (
    product?.name ||
    product?.title ||
    product?.productName ||
    "অজানা পণ্য"
  );
}

export function getProductUnit(product) {
  return (
    product?.unit ||
    product?.unitName ||
    product?.measurement ||
    "প্রতি কেজি"
  );
}

export function getProductEmoji(product) {
  return (
    product?.emoji ||
    product?.icon ||
    product?.image ||
    "🛒"
  );
}