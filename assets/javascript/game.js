var wordpool = [
  "Loomings",
  "Nantucket",
  "Ishmael",
  "Pequod",
  "Ahab",
  "Starbuck",
  "Stubb",
  "Queequeg",
  "Ambergris",
  "Moby"
];

var winTotal = 0;
var lossTotal = 0;
var lettersGuessed = [];
var gamePoints = 0;
var gameWord = "test";
var pointsToWin = 3;
var guessesRemain = 0;
var keypressed = "";

function playgame() {
  lettersGuessed = [];
  document.onkeyup = function(event) {
    //first we will grab a random word from our word pool to get the game started
    // console.log(gameWord.length);
    // this section will take the users entered key and add it to their chose see if it
    keypressed = event.key;

    if (event.keyCode >= 65 && event.keyCode <= 90) {
      if (lettersGuessed.includes(keypressed)) {
        // console.log("you've tried that one");
      } else {
        // add to letters guessed
        lettersGuessed.push(keypressed);
        // Check if its in the Game Wrod

        console.log(gameWord);
        if (gameWord.includes(keypressed)) {
          // console.log("Its in the Word!");
          for (i = 0; i < gameWord.length; i++) {
            if (keypressed === gameWord[i]) {
              // console.log("it's in space " + i);
              var tileSwitch = document.getElementById("tile-" + i);
              tileSwitch.textContent = keypressed;
              correctGuess();
            }
          }
        } else {
          incorrectGuess(keypressed);
        }
      }
    }
    // console.log(keypressed);
  };
}

function resetgame() {
  // this clears the game board
  gamePoints = 0;
  lettersGuessed = [];

  document.getElementById("gameboard").innerHTML = "";
  document.getElementById("rejectsBoard").innerHTML = "";

  gameWord = wordpool[Math.floor(Math.random() * wordpool.length)];
  // this is to set up to conditions to win
  pointsToWin = gameWord.length;
  guessesRemain = gameWord.length + 5;

  document.getElementById("guess-span").textContent = guessesRemain;
  for (i = 0; i < gameWord.length; i++) {
    var targetDiv = document.getElementById("gameboard");
    var tileDiv = document.createElement("div");
    tileDiv.id = "tile-" + i;
    tileDiv.textContent = "_";
    targetDiv.appendChild(tileDiv);
    tileDiv.classList.add("gametile", "col-1");
  }
  console.log(gameWord);
  playgame();
}

function nomoreGuesses() {
  lossTotal++;
  document.getElementById("Subheader2").textContent =
    "Oh no you have run out of guesses! " + gameWord + " was the answer.";
  document.getElementById("loss-span").textContent = lossTotal;
  resetgame();
}
function correctGuess() {
  gamePoints++;
  guessesRemain--;
  document.getElementById("guess-span").textContent = guessesRemain;
  if (gamePoints === pointsToWin) {
    winTotal++;
    document.getElementById("Subheader2").textContent =
      "Ahoy! " + gameWord + " is correct.";
    document.getElementById("win-span").textContent = winTotal;
    resetgame();
  }
  if (guessesRemain == 0) {
    nomoreGuesses();
  }
}
function incorrectGuess(rejectkey) {
  // console.log("Not used yet");
  guessesRemain--;
  document.getElementById("guess-span").textContent = guessesRemain;
  // add to chosen tiles
  var RejectSpot = document.getElementById("rejectsBoard");
  var rejectTile = document.createElement("div");
  rejectTile.textContent = rejectkey;
  RejectSpot.appendChild(rejectTile);
  rejectTile.classList.add("rejecttile");
  if (guessesRemain == 0) {
    nomoreGuesses();
  }
}

//now we are going to set up the game tiles based on how long the word chose is

// this funtion runs wheneevery a key is pressed.

// console.log(gameWord);
// while (guessesRemain > 0) {

resetgame();

//first check if that user has pressed that key before.

//;
//
