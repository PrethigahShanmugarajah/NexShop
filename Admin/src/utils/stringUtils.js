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

/* ---------------- Format date as Thu 25/10/2025 ---------------- */
export function formatDateSlash(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const options = {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options).replace(",", "");
}

/* ---------------- Format date as Thu 25, Oct, 2025 ---------------- */
export function formatDateShortMonth(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  return date
    .toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, ", ")
    .replace(",,", ",");
}
