// n - resolution | ↑ = larger blocks
let n = 9, play = false;
let cols, rows, board, next;
// Canvas placement in column
function setup() {
  // Placement - assign canvas to GOLContainer
  let container = document.getElementById('GOLContainer');
  let canvas = createCanvas(container.offsetWidth-10, 200);
  // Canvas dimensions
  cols = floor(width / n);
  rows = floor(height / n);
  // Canvas is now in GOLContainer
  canvas.parent(container);
  // Grid is a 2D arrays
  initGrid();
  // Start with Gosper glider gun
  initGun();

  // Button related to control of canvas in GOLContainer
  const buttonContainer = createDiv();
  buttonContainer.class('buttonContainer');
  buttonContainer.parent(container);
  // ON / OFF
  const onOffButton = createButton('ON / OFF');
  onOffButton.mousePressed(() => play = !play);
  onOffButton.class('interactButtons');
  onOffButton.mouseOver(() => onOffButton.addClass('buttonHover'));
  onOffButton.mouseOut(() => onOffButton.removeClass('buttonHover'));
  onOffButton.parent(buttonContainer);
  // Random Pattern
  // NEED + Drop down menu with buttons for preset design, ex. Merzenich's p31
  const randomPatternButton = createButton('Random Pattern');
  randomPatternButton.mousePressed(initRandomGrid);
  randomPatternButton.class('interactButtons');
  randomPatternButton.mouseOver(() => randomPatternButton.addClass('buttonHover'));
  randomPatternButton.mouseOut(() => randomPatternButton.removeClass('buttonHover'));
  randomPatternButton.parent(buttonContainer);}

  // In container placement
  inCont()

function inCont() {
  let canvasX = (container.offsetWidth - width) / 2;
  let canvasY = (container.offsetHeight - height) / 2;
  canvas.position(canvasX, canvasY);
}

// BG - Black & ref. generate func when play pressed
function draw() {
  background(0);
  if(play) {
    generate();}
  drawGrid();
}

// 2D Arrays - board & next, preset to 0
function initGrid() {
  board = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
  next = new Array(cols).fill(null).map(() => new Array(rows).fill(0));}
// Random pattern creation via ternary op - 50% (if/else)
function initRandomGrid() {
  board = new Array(cols).fill(null).map(() => new Array(rows).fill(0).map(() => (Math.random() > 0.5 ? 1 : 0)));
  next = new Array(cols).fill(null).map(() => new Array(rows).fill(0));}

// Gosper glider gun 'coords'
function initGun() {
  let gun = [
    [1, 5], [1, 6], [2, 5], [2, 6], [11, 5], [11, 6], [11, 7], [12, 4], [12, 8], [13, 3], [13, 9], [14, 3], [14, 9],
    [15, 6], [16, 4], [16, 8], [17, 5], [17, 6], [17, 7], [18, 6], [21, 3], [21, 4], [21, 5], [22, 3], [22, 4],
    [22, 5], [23, 2], [23, 6], [25, 1], [25, 2], [25, 6], [25, 7], [35, 3], [35, 4], [36, 3], [36, 4]];
// Iteration for placement of gun coords
  for (let coord of gun) {
    board[coord[0]][coord[1]] = 1;}}

// Fill with black/white based on random pattern coords | 1=white & 0=black
function drawGrid() {
  noStroke();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(board[i][j] ? 255 : 0);
      rect(i * n, j * n, n, n);}}
// Allow user to draw cells if in boundaries
  if (mouseIsPressed && mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    let i = floor(mouseX / n);
    let j = floor(mouseY / n);
    // Drawn cells always white - live
    board[i][j] = 1;
  }
}

// Iteration over all cells
function generate() {
  for (let x = 1; x < cols - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      let neighbours = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // neighbour iterate & count live cell num
          neighbours += board[x + i][y + j];}}
      // Val removal of current cell
      neighbours -= board[x][y];
      // If live/die conditions
      next[x][y] = (board[x][y] && neighbours === 2) || neighbours === 3 ? 1 : 0;}}

  // Vals updated with vals from next array
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = next[i][j];
    }
  }
}