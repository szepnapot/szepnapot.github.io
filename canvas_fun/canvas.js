const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const effects = [
  "lighter",
  "xor",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity"
]
let effectIndex = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = 10;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let growing = true;

function draw(e){
  if (!isDrawing) return;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.globalCompositeOperation = effects[effectIndex];
  ctx.stroke();

  [lastX, lastY]= [e.offsetX, e.offsetY];
  hue++;
  if (hue > 360) {
    hue = 0;
    if (effectIndex == effects.length){
      effectIndex = 0;
    } else {
      effectIndex++;
    }
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
    growing = !growing;
  }
  if (growing) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY]= [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
