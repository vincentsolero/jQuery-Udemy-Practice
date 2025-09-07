let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  let audio = new Audio("./sounds/" + randomChosenColor + ".mp3");
  audio.play();
  console.log(gamePattern);
}

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  let audio = new Audio("./sounds/" + userChosenColor + ".mp3");
  audio.play();
  animatePress(userChosenColor);
  checkAnswer(level);
});

function animatePress(currentColor) {
  console.log("woW! " + currentColor);
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keydown(function () {
  if (level === 0) {
    nextSequence();
  }
});

function gameOver() {
  let audio = new Audio("./sounds/wrong.mp3");
  audio.play();
  $("h1").text("BOBO!");
  setTimeout(function () {
    nextSequence();
  }, 1000);
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function checkAnswer(currentLevel) {
  let lastAnswer = userClickedPattern.length - 1;

  if (gamePattern[lastAnswer] === userClickedPattern[lastAnswer]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}
