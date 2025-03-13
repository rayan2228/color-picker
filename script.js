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

pickedColor.addEventListener("click", () =>
  copyTheColor(pickedColor.style.backgroundColor)
);

complementaryColorElm.addEventListener("click", () =>
  copyTheColor(complementaryColorElm.style.backgroundColor)
);

function copyTheColor(target) {
  navigator.clipboard
    .writeText(target)
    .then(() => {
      toastNotification.style.visibility = "visible";
      toastNotification.style.opacity = 10;
    })
    .catch(() => (toastNotification.innerText = "failed to copy"))
    .finally(() => {
      setTimeout(() => {
        toastNotification.style.visibility = "hidden";
        toastNotification.style.opacity = 0;
      }, 2000);
    });
}
