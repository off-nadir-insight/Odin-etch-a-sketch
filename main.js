const container = document.querySelector("#outer-container");
const containerSize = 750;
let gridResolution = 24;
let gridResolutionMin = 5;
let gridResolutionMax = 64;
let squareSize = containerSize / gridResolution;
const rateOfGreyscaleChange = 32;

const btnClear = document.querySelector("#btn-clear")

container.style.width = `${containerSize + 2}px`;

function getDarkerSquareColor(colorValue) {
  const colorArray = colorValue.match(/\d+/g);
  const darkerColorArray = colorArray.map(ele => {
    const color = parseInt(ele)
    return color > rateOfGreyscaleChange ? color - rateOfGreyscaleChange : 0
  })
  return darkerColorArray
}

function paintColor(e) {
  // --- add color via class ---
  // e.target.classList.add("painted")
  const newHslValue = Math.floor(Math.random() * 360)
  
  // --- random color ---
  // e.target.style.backgroundColor = `hsl(${newHslValue}, 100%, 50%)`;
  
  // --- darkens greyscale color --- 
  const squareColor = e.target.style.backgroundColor
  const [r,g,b] = getDarkerSquareColor(squareColor)

  e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function createCol(newGridRes) {
  newSquareSize = containerSize / newGridRes
  const newDiv = document.createElement('div');
  newDiv.style.height = `${newSquareSize}px`;
  newDiv.style.width = `${newSquareSize}px`;
  newDiv.style.backgroundColor = "hsl(0, 0%, 100%)"
  newDiv.classList.add("square");
  newDiv.addEventListener('mouseover', paintColor);
  
  container.appendChild(newDiv)
}

function generateGrid(gridRes) {
  for (let y = 0; y < gridRes; y++) {
    for (let x = 0; x < gridRes; x++) {
      createCol(gridRes);
    }
  }
}

function clearGrid() {
  container.innerHTML = ""
}

function getGridSize() {
  let gridPrompt = parseInt(window.prompt("Grid resolution (between 5 - 64)", "24"));
  console.log(gridPrompt)
  if (gridPrompt < gridResolutionMin) {
    gridPrompt = gridResolutionMin;
  } else if (gridPrompt > gridResolutionMax) {
    gridPrompt = gridResolutionMax;
  } else {
    gridPrompt = 24;
  }
  clearGrid();
  generateGrid(gridPrompt);
}

function clearPalette() {
  document.querySelectorAll(".square").forEach(square => {
    square.classList.remove("painted");
  })
}

generateGrid(gridResolution);
btnClear.addEventListener('click', getGridSize);