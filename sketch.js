let video;
let facemesh;
let handpose;
let facePredictions = [];
let handPredictions = [];
let gesture = ""; // "scissors", "rock", "paper"

function setup() {
  createCanvas(640, 480).position(
    (windowWidth - 640) / 2,
    (windowHeight - 480) / 2
  );
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, () => {});
  facemesh.on('predict', results => {
    facePredictions = results;
  });

  handpose = ml5.handpose(video, () => {});
  handpose.on('predict', results => {
    handPredictions = results;
    gesture = detectGesture(results);
  });
}

// 根據手指張開數量判斷手勢
function detectGesture(results) {
  if (results.length === 0) return "";

  const annotations = results[0].annotations;
  // 計算伸出的手指數量（大拇指不算）
  let extended = 0;
  const fingers = ['indexFinger', 'middleFinger', 'ringFinger', 'pinky'];
  fingers.forEach(finger => {
    const tip = annotations[finger][3];
    const pip = annotations[finger][1];
    if (tip[1] < pip[1]) extended++; // tip 在 pip 上方，表示伸出
  });

  if (extended === 2) return "scissors";
  if (extended === 0) return "rock";
  if (extended === 4) return "paper";
  return "";
}

function draw() {
  // 左右翻轉攝影機畫面
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  if (facePredictions.length > 0) {
    const keypoints = facePredictions[0].scaledMesh;
    let idx = null;

    // 根據手勢決定圓圈位置
    if (gesture === "scissors") {
      idx = 234; // 左臉頰
    } else if (gesture === "rock") {
      idx = 454; // 右臉頰
    } else if (gesture === "paper") {
      idx = 10; // 額頭中央
    }

    if (idx !== null) {
      const [x, y] = keypoints[idx];
      const flippedX = width - x; // x 座標左右翻轉
      noFill();
      stroke(255, 0, 0);
      strokeWeight(4);
      ellipse(flippedX, y, 100, 100);
    }
  }
  pop();
}
