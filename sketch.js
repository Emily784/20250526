function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // 假設這個變數由手勢辨識模型給出
  let handSign = "scissors"; // 可改為 "rock" 或 "paper"

  // 臉的基本參考點
  let faceCenterX = 200;
  let faceCenterY = 200;

  // 畫臉（參考用）
  fill(255, 224, 189);
  ellipse(faceCenterX, faceCenterY, 200, 250);

  // 根據手勢畫圓
  fill(255, 0, 0, 180);
  noStroke();
  if (handSign === "scissors") {
    // 額頭
    ellipse(faceCenterX, faceCenterY - 80, 40, 40);
  } else if (handSign === "rock") {
    // 左臉頰
    ellipse(faceCenterX - 60, faceCenterY + 40, 40, 40);
  } else if (handSign === "paper") {
    // 鼻子
    ellipse(faceCenterX, faceCenterY, 40, 40);
  }
}
