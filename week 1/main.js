// 각 '뽑기' 버튼에 대한 이벤트 리스너 설정

var buttonIndex;

document.querySelectorAll(".retry").forEach((button) => {
  button.addEventListener("click", function () {
    this.disabled = false; // 버튼 비활성화
  });
});
function retry() {
  
  setTimeout(function(){
    drawRandom(1);
  },1000);
  setTimeout(function(){
    drawRandom(2);
  },2000);
  setTimeout(function(){
    drawRandom(3);
  },3000);
  
}

// 이미지 선택 결과를 저장하는 배열
var selectedItems = [];

var delay;

function drawRandom(buttonIndex) {
  var intervalDelay = 200;
  var speedUpFactor = 0.9;
  var slowDownFactor = 1.1;
  var count = 0;
  var maxCount = Math.floor(Math.random() * 10 + 20);
  var start = 0;
  var items = Array(7)
    .fill()
    .map((_, i) => start + i + 1);

  function drawItem() {
    var randomIndex = Math.floor(Math.random() * items.length);
    var selectedItem = items[randomIndex];

    if (count >= maxCount - 1) {
      setTimeout(function () {
        document.getElementById("image" + buttonIndex).src =
          "./heroes/" + selectedItem + ".png";
        selectedItems[buttonIndex - 1] = selectedItem;

        // 마지막 항목을 변경한 후, 모든 항목이 변경되었는지 확인하고 1초 후에 checkJackpot 함수를 호출
        if (
          selectedItems.filter((item) => item !== undefined).length ===
          document.querySelectorAll(".drawButton").length
        ) {
          setTimeout(checkJackpot, 1000); // 1초 지연 후 Jackpot 검사
        }
      }, intervalDelay);
    } else {
      document.getElementById("image" + buttonIndex).src =
        "./heroes/" + selectedItem + ".png";
    }

    count++;
    if (count < maxCount / 2) {
      intervalDelay *= speedUpFactor;
    } else {
      intervalDelay *= slowDownFactor;
    }
    if (count < maxCount) {
      setTimeout(drawItem, intervalDelay);
    }
  }
  drawItem();
}

// Jackpot 검사
function checkJackpot() {
  if (new Set(selectedItems).size === 1) {
    alert("Jackpot!");
  }
}
