const canvas = document.getElementById("paintarea"); // canvas 객체
const ctx = canvas.getContext("2d"); // canvas 객체를 사용할 타입 지정

const INITIAL_COLOR = "#000000";
const CANVAS_SIZE = 500;

// 캔버스 크기
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 저장을 위한 기본값
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

// 기본 색상과 굵기 조절
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// 페인팅 모드. false면 그리지 않음
let painting = false;

// 마우스가 떠나면 그리지 않음
const stopPainting = () => {
  painting = false;
};

// 영역에 마우스를 클릭하면 그림
const startPainting = () => {
  painting = true;
};

// 누른 채로 마우스를 움직이면 그림
const onMouseMove = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    // painting이 false. 즉, 그리는 중이 아닐때.
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

// 마우스 좌클릭을 떼면 그리기가 종료됨
const onMouseUp = (event) => {
  stopPainting();
};

const btnMode = document.getElementById("btn_mode");
let filling = false;

const modeChangeHandle = (event) => {
  if (filling === true) {
    filling = false;
    btnMode.innerText = "Fill";
  } else {
    filling = true;
    btnMode.innerText = "paint";
  }
};

btnMode.addEventListener("click", modeChangeHandle);

const fillingClickHandle = () => {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", fillingClickHandle);
}

// 색상 변경 기능
const color_array = document.getElementsByClassName("jsColor");

const ColorSelectHandle = (event) => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

Array.from(color_array).forEach((color) => {
  color.addEventListener("click", ColorSelectHandle);
});

// 굵기 변경 기능
const brush = document.getElementById("brush_option");
const brush_current = document.getElementById("brush_current");

const brushControlHandle = (event) => {
  const size = event.target.value;
  ctx.lineWidth = size;
  brush_current.innerText = `굵기 : ${size}`;
};

brush.addEventListener("input", brushControlHandle);

// 그림 저장 기능
const btnSave = document.getElementById("btn_Save");

const SaveClickHandle = () => {
  const image = canvas.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  link.href = image;
  link.download = "LSD_PaintBrush";
  link.click();
};

btnSave.addEventListener("click", SaveClickHandle);

// 그림 초기화 기능
const btnReset = document.getElementById("btn_Reset");

const ResetClickHandle = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
};

btnReset.addEventListener("click", ResetClickHandle);
