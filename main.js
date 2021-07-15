const container = document.querySelector("#outer-container");
const columns = 16;
const rows = 16;
const squareSize = 30;

const btnClear = document.querySelector("#btn-clear")


container.style.maxWidth = `${(columns * squareSize)+ 2}px`;

function paintBlack(e) {
  e.target.classList.add("painted")
}

function createCol(idX) {
  const newDiv = document.createElement('div');
  newDiv.style.height = `${squareSize}px`;
  newDiv.style.width = `${squareSize}px`;
  newDiv.classList.add("square");
  newDiv.addEventListener('mouseover', paintBlack)
  
  container.appendChild(newDiv)
}

function generateGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      createCol(x, y);
    }
  }
}

function clearPalette() {
  document.querySelectorAll(".square").forEach(square => {
    square.classList.remove("painted")
  })
}


generateGrid()
btnClear.addEventListener('click', clearPalette)