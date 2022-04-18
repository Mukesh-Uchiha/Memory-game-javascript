var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

$(document).keydown(function() {
  if (!start) {
    $("#level-title").text("Level" + level);

    nextSequence();
    start = true;
  }
});



$(".btn").click(function() {
  var userChosenColour = $(this).attr("id")
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length - 1)
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Failed")
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over").fadeIn(50);
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);


    var sound = new Audio("sounds/wrong.mp3");
    sound.play();

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber];
  console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
  playSound(randomChosenColour);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");


  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];
  level = 0;
  start = false;


}
