const colorInputElm = document.getElementById("colorInput");
const pickedColorElm = document.getElementById("pickedColor");
const complementaryColorElm = document.getElementById("complementaryColor");
const saveColorBtn = document.getElementById("saveColor");
const savedColorsElm = document.getElementById("savedColors");
const savedColorsListElm = document.querySelector(".saved-colors-list");
const toastNotificationElm = document.getElementById("toast");
let pickedColorCode = "#ffffff";
let complementaryColorCode = "#000000";

colorInputElm.addEventListener("input", () => {
  pickedColorCode = colorInputElm.value;
  complementaryColorCode = getComplementaryColor(pickedColorCode);
  updateColorDisplay(pickedColorCode, complementaryColorCode);
});

pickedColorElm.addEventListener("click", () =>
  copyTheColor(pickedColorElm.style.backgroundColor)
);

complementaryColorElm.addEventListener("click", () =>
  copyTheColor(complementaryColorElm.style.backgroundColor)
);

saveColorBtn.addEventListener("click", savedColor);
function getComplementaryColor(selectedColor) {
  const base = parseInt(selectedColor.slice(1), 16);
  return `#${(0xffffff ^ base).toString(16).padStart(6, "0")}`;
}

function updateColorDisplay(selectedColor, complementaryColor) {
  pickedColorElm.style.backgroundColor = selectedColor;
  complementaryColorElm.style.backgroundColor = complementaryColor;
}

function copyTheColor(target) {
  navigator.clipboard
    .writeText(target)
    .then(() => {
      toastNotificationElm.style.visibility = "visible";
      toastNotificationElm.style.opacity = 10;
    })
    .catch(() => (toastNotificationElm.innerText = "failed to copy"))
    .finally(() => {
      setTimeout(() => {
        toastNotificationElm.style.visibility = "hidden";
        toastNotificationElm.style.opacity = 0;
      }, 2000);
    });
}

function savedColor() {
  const savedColorElm = document.createElement("div");
  savedColorElm.classList.add("saved-color");
  savedColorElm.innerHTML = `
    <div style="background-color: ${pickedColorCode}">
      <span class="color-label" >${pickedColorCode}</span>
    </div>
    <div  style="background-color: ${complementaryColorCode}">
      <span class="color-label">${complementaryColorCode}</span>
    </div>
  `;
  savedColorsListElm.prepend(savedColorElm);
}
