const root = document.getElementById("root");

const cellWidth = 50;
const cellHeight = 50;

let topShowBar, bottomShowBar;
let storedValue;

let clickEl;

const main = () => {
  renderResult();
  renderCells();
};

main();

function renderResult() {
  const strArr = ["section", "div", "div"];
  const elsArr = [];

  for (let i = 0; i < strArr.length; i++) {
    elsArr[i] = document.createElement(strArr[i]);
    if (i !== 0) {
      elsArr[0].appendChild(elsArr[i]);
      elsArr[i].className = "bar" + i;
    }
  }

  const [section, topBar, bottomBar] = elsArr;
  root.appendChild(section);

  topShowBar = topBar;
  bottomShowBar = bottomBar;

  return [topBar, bottomBar];
};

function renderCells() {
  const grid = document.createElement("section");
  grid.className = "grid";

  const contents = ["AC", "DEL", "÷", 1, 2, 3, "*", 4, 5, 6, "+", 7, 8, 9, "-", ".", 0, "="];

  for (let i = 0; i < contents.length; i++) {
    if (i === 0) {
      createCell(grid, true, contents[i]);
    } else if (i === contents.length - 1) {
      createCell(grid, true, contents[i]);
    } else {
      createCell(grid, false, contents[i]);
    }
  }

  root.appendChild(grid);
};

function createCell(grid, isDouble, text) {
  const cell = document.createElement("button");

  if (isDouble) {
    cell.style.width = cellWidth * 2 + "px";
  } else {
    cell.style.width = cellWidth + "px";
  }

  cell.style.height = cellHeight + "px";
  cell.textContent = text;
  grid.appendChild(cell);

  cell.addEventListener("click", () => {
    if (typeof text === "number") {
      bottomShowBar.textContent += text;
    }
    if (cell.textContent === "÷") {
      showResult(cell, "÷")
    } else if (cell.textContent === "*") {
      showResult(cell, "*")
    } else if (cell.textContent === "+") {
      showResult(cell, "+")
    } else if (cell.textContent === "-") {
      showResult(cell, "-")
    } else if (cell.textContent === "=") {
      if (clickEl.textContent === "÷") {
        const res = Number(storedValue) / Number(bottomShowBar.textContent);
        computedVal(res)
      } else if (clickEl.textContent === "*") {
        const res = Number(storedValue) * Number(bottomShowBar.textContent);
        computedVal(res)
      } else if (clickEl.textContent === "+") {
        const res = Number(storedValue) + Number(bottomShowBar.textContent);
        computedVal(res)
      } else if (clickEl.textContent === "-") {
        const res = Number(storedValue) - Number(bottomShowBar.textContent);
        computedVal(res)
      }
    }
  });
};

function showResult(cell, optor) {
  storedValue = bottomShowBar.textContent;
  topShowBar.textContent = storedValue + optor;
  bottomShowBar.textContent = "";
  clickEl = cell;
}

function computedVal(res) {
  topShowBar.textContent = "";
  bottomShowBar.textContent = res;
}