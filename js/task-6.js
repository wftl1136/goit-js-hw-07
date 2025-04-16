function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const buttonCreate = document.querySelector("[data-create]");
const buttonDestroy = document.querySelector("[data-destroy]");
const inputField = document.querySelector('input[type="number"]');

buttonCreate.addEventListener("click", () => {
  const amount = Number(inputField.value);
  if (inputField.value === "") {
    return alert("Для початку введіть значення");
  }
  inputField.value = "";
  if (amount < 1 || amount > 100) {
    return alert("Введене число повинне бути в межах від 1 до 100");
  }
  boxesCreate(amount);
});

function boxesCreate(amount) {
  const boxesContainer = document.getElementById("boxes");
  boxesContainer.innerHTML = "";

  const boxes = [];
  for (let i = 0; i < amount; i++) {
    const box = document.createElement("div");
    const size = 30 + i * 10;
    box.style.width = `${size}px`;
    box.style.height = `${size}px`;
    box.style.backgroundColor = getRandomHexColor();
    boxes.push(box);
  }
  boxesContainer.append(...boxes);
}

function boxesDestroy() {
  const boxesContainer = document.getElementById("boxes");
  boxesContainer.innerHTML = "";
}

let countdownTimer;

buttonDestroy.addEventListener("click", () => {
  const boxesContainer = document.getElementById("boxes");
  if (boxesContainer.children.length === 0) {
    return alert("Немає даних для видалень");
  }
  const userConfirmed = confirm(
    "Ви дійсно бажаєте все видалити? Сторінка буде очищена, всі дані втрачено!"
  );
  if (userConfirmed) {
    const modalDiv = document.createElement("div");
    modalDiv.style.position = "fixed";
    modalDiv.style.left = "50%";
    modalDiv.style.top = "50%";
    modalDiv.style.transform = "translate(-50%, -50%)";
    modalDiv.style.backgroundColor = "#ff8080";
    modalDiv.style.border = "3px solid #ff0000";
    modalDiv.style.padding = "20px";
    modalDiv.style.borderRadius = "30px";
    modalDiv.style.zIndex = "1000";

    document.body.appendChild(modalDiv);

    const countdownDiv = document.createElement("div");
    countdownDiv.id = "countdown";
    modalDiv.appendChild(countdownDiv);

    let countdownValue = 4;
    countdownDiv.textContent = `Дані будуть видалені через ${
      countdownValue - 1
    } секунд`;
    countdownDiv.style.fontWeight = "bold";
    countdownDiv.style.fontSize = "20px";

    countdownTimer = setInterval(() => {
      countdownValue--;
      countdownDiv.textContent = `Дані будуть видалені через ${
        countdownValue - 1
      } секунд`;

      if (countdownValue <= 1) {
        countdownDiv.textContent = "Дані повністю видалені. Все очищено";
        boxesDestroy();
        buttonCancel.remove();
      }
      if (countdownValue <= 0) {
        clearInterval(countdownTimer);
        modalDiv.remove();
        countdownDiv.remove();
      }
    }, 1000);
    const buttonCancel = document.createElement("button");
    buttonCancel.textContent = "Відміна";
    buttonCancel.style.display = "block";
    buttonCancel.style.margin = "20px auto";
    buttonCancel.style.padding = "10px";
    buttonCancel.style.borderRadius = "10px";
    buttonCancel.style.borderColor = "#ff8080";
    buttonCancel.style.fontWeight = "bold";
    modalDiv.appendChild(buttonCancel);

    buttonCancel.addEventListener("click", () => {
      clearInterval(countdownTimer);
      modalDiv.remove();
      countdownDiv.remove();
      buttonCancel.remove();
      alert("Дякую, що передумали і зберегли мені життя 😊");
    });
    return;
  }
  alert("Дякую, що зберегли мені життя 😊");
});