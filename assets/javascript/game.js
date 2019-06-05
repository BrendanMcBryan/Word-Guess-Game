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
// var gameWord = "Ahab";

function startGame(gameWord) {
  // this clears the game board
  document.getElementById("gameboard").innerHTML = "";

  var gameWord = wordpool[Math.floor(Math.random() * wordpool.length)];
  // this is to set up to conditions to win
  var gamePoints = 0;

  document.getElementById("guess-span").textContent = guessesRemain;
  var lettersGuessed = [];
  for (i = 0; i < gameWord.length; i++) {
    var targetDiv = document.getElementById("gameboard");
    var tileDiv = document.createElement("div");
    tileDiv.id = "tile-" + i;
    tileDiv.textContent = "_";
    targetDiv.appendChild(tileDiv);
    tileDiv.classList.add("gametile", "col-1");
  }
  console.log(gameWord);
  return gameWord;
}

function nomoreGuesses() {
  lossTotal++;
  document.getElementById("Subheader2").textContent =
    "You have lost Press any key to play again";
  document.getElementById("loss-span").textContent = lossTotal;
  document.onkeyup = function(event) {
    startGame();
  };
}
function correctGuess() {
  gamePoints++;
  guessesRemain--;
  document.getElementById("guess-span").textContent = guessesRemain;
  if (gamePoints === pointsToWin) {
    winTotal++;
    document.getElementById("Subheader2").textContent =
      "You have Won! Press any key to play again";
    document.getElementById("win-span").textContent = winTotal;
    document.onkeyup = function(event) {
      startGame();
    };
  }
}
function incorrectGuess(rejectkey) {
  console.log("Not used yet");
  guessesRemain--;
  document.getElementById("guess-span").textContent = guessesRemain;
  // add to chosen tiles
  var RejectSpot = document.getElementById("rejectsBoard");
  var rejectTile = document.createElement("div");
  rejectTile.textContent = rejectkey;
  RejectSpot.appendChild(rejectTile);
  rejectTile.classList.add("rejecttile", "col-2");
  if (guessesRemain === 0) {
    nomoreGuesses();
  }
}

//now we are going to set up the game tiles based on how long the word chose is

// this funtion runs wheneevery a key is pressed.

gameWord = startGame();
var pointsToWin = gameWord.length;
var guessesRemain = gameWord.length + 5;
console.log(gameWord);
document.onkeyup = function(event) {
  //first we will grab a random word from our word pool to get the game started

  // console.log(gameWord.length);
  // this section will take the users entered key and add it to their chose see if it
  var keypressed = event.key;

  if (lettersGuessed.includes(keypressed)) {
    console.log("you've tried that one");
  } else {
    // add to letters guessed
    lettersGuessed.push(keypressed);
    // Check if its in the Game Wrod
    if (gameWord.includes(keypressed)) {
      // console.log("Its in the Word!");
      for (i = 0; i < gameWord.length; i++) {
        if (keypressed === gameWord[i]) {
          console.log("it's in space " + i);
          var tileSwitch = document.getElementById("tile-" + i);
          tileSwitch.textContent = keypressed;
          correctGuess();
        }
      }
    } else {
      incorrectGuess(keypressed);
    }
  }
  console.log(keypressed);

  //first check if that user has pressed that key before.
};
