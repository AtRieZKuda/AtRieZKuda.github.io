let n = 10;
let cols, rows, board, next;
let play = false;

function setup() {
  let container = document.getElementById('GOLContainer');
  let canvas = createCanvas(container.offsetWidth-10, container.offsetHeight/3);

  cols = floor(width / n);
  rows = floor(height / n);

  canvas.parent(container);

  initGrid();
  initGun();

  const onOffButton = createButton('ON / OFF');
  onOffButton.mousePressed(() => play = !play);
  onOffButton.parent(container);
  onOffButton.style('padding', '10px');
  onOffButton.class('myButton');
  onOffButton.mouseOver(() => onOffButton.addClass('buttonHover'));
  onOffButton.mouseOut(() => onOffButton.removeClass('buttonHover'));

  const randomPatternButton = createButton('Random Pattern');
  randomPatternButton.mousePressed(initRandomGrid);
  randomPatternButton.parent(container);
  randomPatternButton.style('padding', '10px');
  randomPatternButton.class('myButton');
  randomPatternButton.mouseOver(() => randomPatternButton.addClass('buttonHover'));
  randomPatternButton.mouseOut(() => randomPatternButton.removeClass('buttonHover'));}

function draw() {
  background(0);
  if(play) {
    generate();
  }
  drawGrid();
}

function initGrid() {
  board = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
  next = new Array(cols).fill(null).map(() => new Array(rows).fill(0));}

function initRandomGrid() {
  board = new Array(cols).fill(null).map(() => new Array(rows).fill(0).map(() => (Math.random() > 0.5 ? 1 : 0)));
  next = new Array(cols).fill(null).map(() => new Array(rows).fill(0));}

function initGun() {
  let gun = [
    [1, 5], [1, 6], [2, 5], [2, 6], [11, 5], [11, 6], [11, 7], [12, 4], [12, 8], [13, 3], [13, 9], [14, 3], [14, 9],
    [15, 6], [16, 4], [16, 8], [17, 5], [17, 6], [17, 7], [18, 6], [21, 3], [21, 4], [21, 5], [22, 3], [22, 4],
    [22, 5], [23, 2], [23, 6], [25, 1], [25, 2], [25, 6], [25, 7], [35, 3], [35, 4], [36, 3], [36, 4]];

  for (let coord of gun) {
    board[coord[0]][coord[1]] = 1;}}

function drawGrid() {
  noStroke();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(board[i][j] ? 255 : 0);
      rect(i * n, j * n, n, n);}}

  if (mouseIsPressed && mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    let i = floor(mouseX / n);
    let j = floor(mouseY / n);
    board[i][j] = 1;
  }
}

function generate() {
  for (let x = 1; x < cols - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x + i][y + j];}}
      neighbors -= board[x][y];
      next[x][y] = (board[x][y] && neighbors === 2) || neighbors === 3 ? 1 : 0;}}

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = next[i][j];
    }
  }
}

