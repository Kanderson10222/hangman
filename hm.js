// var startOver = "whats up sixer fans";
// var submit = "sixers sixers sixers";
//testing my button
// function playAgain() {
//   alert(startOver);
// }
var playersLetter = document.getElementById("input");
var hint = document.getElementById("hintbox");
// var hangman = document.getElementById("hangman");
var guessLetters = document.getElementById("guessLetters");
var letters = document.getElementsByClassName('letters');
// array of correct answers
var gameNames = ["embiid", "simmons", "iverson"];
// array of the clues provided to the user
var tips = ["Hint: trust the process", "Hint: rookie point guard", "Hint: hall of famer #3"]
var word = Math.floor(Math.random() * gameNames.length);
//displays hint words and dashes
var currentWord = gameNames[word];
var clue = tips[word];
var displayBox = document.getElementById("displayBox");
var chosenWord = currentWord.split('');
var remainingLetters = [...new Set(chosenWord)];
var playerChances = 10;
//counts the incorrect inputs
var puzzleLife = remainingLetters.length;
var win = "you win";
var lose = "lose";
var playersLetter = document.getElementById('insert');
var submit = document.getElementById('submit');
var hiddenLetters = document.createElement('div');
hiddenLetters.setAttribute('class', 'dashes');
var hintbox = document.getElementById('hintbox');

//display clue
guessLetters.innerHTML = clue;


//diplay and style of dashes and hiddenLetters
for (var i = 0; i < chosenWord.length; i++) {
  var hiddenLetters = document.createElement('div')
  hiddenLetters.setAttribute('class', 'dashes')
  hiddenLetters.style.height = '48px';
  hiddenLetters.style.width = '35px';
  hiddenLetters.style.borderBottom = 'solid black';
  hiddenLetters.style.display = 'inline-block';
  hiddenLetters.style.marginLeft = '15px';
  hiddenLetters.style.marginRight = '23px';
  hiddenLetters.style.textAlign = 'center';
  hiddenLetters.style.borderColor = 'red';
  displayBox.appendChild(hiddenLetters);
}


submit.addEventListener('click', function() {
  // Repeat Guess
  if (isRepeatGuess(playersLetter.value)) {
    alert("You already guessed that!");
    return;
  }

  // Incorrect Guess
  if (scoreLetter(playersLetter.value) == false) {
    playerChances--

    if (playerChances <= 0) {
      alert('you lose');
    } else {
      alert("Wrong letter. You have " + playerChances + ' ' + 'lives left')
    }
    return;
  }

  // Correct Guess
  for (i = 0; i < remainingLetters.length; i++) {

    if (playersLetter.value == remainingLetters[i]) {
      hintbox.innerHTML += playersLetter.value + ' ';

      // Find all matches in dashes
      var matches = [];
      for (var j = 0; j < chosenWord.length; j++) {
        if (chosenWord[j] == playersLetter.value) matches.push(j);
      }
      // Display matches
      for (var k = 0; k < matches.length; k++) {
        let match = matches[k];
        var answerLetter = document.getElementsByClassName('dashes')[match];
        answerLetter.innerHTML = playersLetter.value
      }
      puzzleLife--
      remainingLetters.splice(i, 1);
      console.log(remainingLetters)
      playersLetter.value = "";
    }
    if (puzzleLife == 0) {
      alert('you win');
    }

  }
  // runs an if statement against the users lives left

})

function scoreLetter(value) {
  return (remainingLetters.indexOf(value) == -1) ? false : true
}

function isRepeatGuess(value) {
  if (chosenWord.indexOf(value) >= 0 && remainingLetters.indexOf(value) == -1) return true;

  return false;
}


// restarts game
function playAgain() {


  window.location.reload();
}