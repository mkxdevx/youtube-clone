export const API_KEY = "AIzaSyBR5gY7e_AdrjljiH9TsHKeogY4YzVMimI";

export function valueConverter(value) {
  if (value >= 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value >= 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
}

export function decodeHTMLEntities(text) {
  if (!text) return "";
  const parser = new DOMParser();
  const decoded = parser.parseFromString(text, "text/html");
  return decoded.body.textContent;
}
