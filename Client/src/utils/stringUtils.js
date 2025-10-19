/* ---------------- Convert entire string to uppercase ---------------- */
export function toUpperCaseAll(text) {
  if (typeof text !== "string") return "";
  return text.toUpperCase();
}

/* ---------------- Capitalize first letter of each word ---------------- */
export function capitalizeWords(text) {
  if (typeof text !== "string") return "";
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
