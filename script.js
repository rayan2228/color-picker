const colorInput = document.getElementById("colorInput");
const pickedColor = document.getElementById("pickedColor");
const complementaryColorElm = document.getElementById("complementaryColor");
const saveColor = document.getElementById("saveColor");
const savedColors = document.getElementById("savedColors");
const savedColorsList = document.querySelector(".saved-colors-list");
const toastNotification = document.getElementById("toast");

colorInput.addEventListener("input", () => {
  const selectedColor = colorInput.value;
  const complementaryColor = getComplementaryColor(selectedColor);
  updateColorDisplay(selectedColor, complementaryColor);
});

function getComplementaryColor(selectedColor) {
  const base = parseInt(selectedColor.slice(1), 16);
  return `#${(0xffffff ^ base).toString(16).padStart(6, "0")}`;
}

function updateColorDisplay(selectedColor, complementaryColor) {
  pickedColor.style.backgroundColor = selectedColor;
  complementaryColorElm.style.backgroundColor = complementaryColor;
}
