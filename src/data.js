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
