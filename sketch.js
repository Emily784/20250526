let video;
let facemesh;
let predictions = [];

function setup() {
  // 建立640x480畫布並置中
  let cnv = createCanvas(640, 480);
  cnv.style('display', 'block');
  cnv.parent(document.body);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 載入facemesh模型
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', gotResults);
}

function modelReady() {
  console.log('Facemesh model loaded!');
}

function gotResults(results) {
  predictions = results;
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  // 畫出facemesh特徵點
  drawKeypoints();
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i++) {
    const keypoints = predictions[i].scaledMesh;
    for (let j = 0; j < keypoints.length; j++) {
      const [x, y] = keypoints[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(x, y, 3, 3);
    }
  }
}
