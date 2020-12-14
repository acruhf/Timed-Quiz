// Variables
var start = document.getElementById("start");
var intro = document.getElementById("intro");
var questions = document.getElementById("questions");
var result = document.getElementById("result");
var userCorrect = document.getElementById("userCorrect");
var score = document.getElementById("userScore");
var initials = document.getElementById("initials");
var submitBtn = document.getElementById("submit");
var scores = document.getElementById("scores");
var viewScores = document.getElementById("viewScores");
var questionTxt = document.getElementById("questionTxt");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");
var buttons = document.getElementById("buttons");
var response = document.querySelector(".response");
var timeDisplay = document.getElementById("time-display");
var leaderBoard = document.getElementById("leaderBoard");
var backBtn = document.getElementById("back");
var clearBtn = document.getElementById("clear");
var navbar = document.querySelector(".navbar");
var hr = document.getElementById("hr");
var timeFont = document.getElementById("time");
var i = 0;
var guess;
var correct = 0;
var secondsLeft = 60;
var timerInterval;
var highscores = [];
var userInitials;
var userScore

//Question Set
var questionSet = [
    {
      "question": "Which guitarist built his own prototype electric guitar nicknamed 'The Log'?",
      
        "button1": "Duane Eddy",
        "button2": "Charlie Christian",
        "button3": "Wes Montgomery",
        "button4": "Les Paul",
        "answer": "4"
      },
    {
      "question": "Which guitar company was the first to mass-produce a solidbody electric guitar?",
      
        "button1": "Gibson",
        "button2": "Fender",
        "button3": "Rickenbacker",
        "button4": "Epiphone",
        "answer": "2"
      },
    {
      "question": "How many pickups does a Fender Stratocaster have?",
      
        "button1": " 1",
        "button2": " 2",
        "button3": " 3",
        "button4": " 4",
        "answer": "3"
      },
    {
      "question": "What was the first successful Whammy Bar design?",
      
        "button1": "Bigsby Vibrato Tailpiece",
        "button2": "Fender Synchronized Tremolo",
        "button3": "Floyd Rose locking tremolo",
        "button4": "Maestro Vibrola",
        "answer": "1"
      },
    {
      "question": "Which Electric Guitar is shaped like a Triangle?",

        "button1": "Stratocaster",
        "button2": "Flying V",
        "button3": "ES-335",
        "button4": "Jazzmaster",
        "answer": "2"
    } 
    
  ];



// Function to retrieve questions and fill in the Quiz Card
function getQuestion (){
  if (i === questionSet.length){
      showFinalResults();
      clearInterval(timerInterval);
      return (secondsLeft);
  }
  questionTxt.textContent = questionSet[i].question;
  btn1.textContent = questionSet[i].button1;
  btn2.textContent = questionSet[i].button2;
  btn3.textContent = questionSet[i].button3;
  btn4.textContent = questionSet[i].button4;
}

// Function to check the player's guess against the answer for each question
function checkAnswer(guess){
  if (guess === questionSet[i].answer){
      correct++;
      i++;
      response.textContent = "Correct!";
      showResult();
      getQuestion();
  }
  else{
      i++;
      response.textContent = "Wrong!";
      secondsLeft = secondsLeft - 15;
      console.log("Seconds Left: "+secondsLeft);
      showResult();
      getQuestion();
  }
}

// Function to show whether the player's answer was correct or wrong in the response area
function showResult(){
  response.style.display = "block";
  var countdown = 1;
  var timer = setTimeout(function() {
      countdown--;
      if (countdown === 0){
          clearInterval(timer);
          response.style.display = "none";
      }
  }, 1000);
}

//Function to show the player's final quiz score 
function showFinalResults(){
  console.log("show final result hit with seconds left: ",secondsLeft);
  clearInterval(timerInterval);
  userCorrect.textContent = correct;
  if (correct === 0){
      secondsLeft = 0;
      timeDisplay.textContent = secondsLeft;
      score.textContent = "0";
  }    
  intro.style.display = "none";
  questions.style.display = "none";    
  scores.style.display = "none";
  result.style.display = "block";
}

//Function to get the highscores stored in local storage
function getScores(){
  highscores = JSON.parse(localStorage.getItem("highscores"));
  console.log(highscores);
  if(!highscores){
      highscores = [];
      return(highscores);
  }
  else{
      return(highscores);
  }
}

//Function to show the Scores Content Card and populate the leaderboard with the highscores stored in local storage
function showScores(){
  getScores();
      for (s=0; s<highscores.length; s++){
          var scoreInitials = highscores[s].initials;
          var scoreSaved = highscores[s].score;
          var scoreEntry = document.createElement("li");
          scoreEntry.setAttribute("class", "score");
          scoreEntry.textContent = scoreInitials + " - " + scoreSaved; 
          leaderBoard.appendChild(scoreEntry);
      }
  navbar.style.visibility = "hidden";
  hr.style.visibility = "hidden";
  intro.style.display = "none";
  questions.style.display = "none";
  result.style.display = "none";
  scores.style.display = "block";
}

//Function to start the quiz timer
function startTimer(){
  timerInterval = setInterval(timer, 1000);
}

//Function for the quiz timer setInterval callback function
function timer () {
  secondsLeft--;
  timeDisplay.textContent = secondsLeft; 
  score.textContent = secondsLeft; 
  if(secondsLeft === 0) {
      score.textContent = "0";
      clearInterval(timerInterval);
      showFinalResults();
      return;
  }
}

//Click event handler for the View Scores link in the Navbar
viewScores.addEventListener("click", function(event){
  event.preventDefault();
  clearInterval(timerInterval);
  showScores();
})

//Click event handler for the Start button to start the quiz
start.addEventListener("click", function (event){
  event.preventDefault();
  getScores();
  getQuestion();
  intro.style.display = "none";
  questions.style.display = "block";
  timeFont.style.display = "block";
  timeDisplay.textContent = secondsLeft;
  startTimer(secondsLeft);
})

//Click event handler for the multiple choice answer buttons in the Questions Content Card
buttons.addEventListener("click", function (event){
  if(event.target.matches("button")){
      event.preventDefault();
      guess = event.target.value;
      checkAnswer(guess);
  }
})

//Click event handler for the submit button for the player to store his/her initials and score
submitBtn.addEventListener("click", function (event){
  event.preventDefault();
  userInitials = initials.value.trim();
  if (userInitials === ""){
      alert("Please enter your initials.");
      return;
  }
  console.log(userInitials);
  userScore = secondsLeft;
  console.log(userScore);
  var newScore = {"initials": userInitials, "score": userScore};
  highscores.push(newScore);
  highscores.sort(function(a, b){return(b.score-a.score)});
  console.log("HighScores: " + highscores);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  showScores();
})

//Click event handler for the Go Back button on the highscores content card
backBtn.addEventListener("click", function(event){
  event.preventDefault();
  window.location.reload();
})

//Click event handler for the Clear button on the highscores content card
clearBtn.addEventListener("click", function(event){
  event.preventDefault();
  localStorage.removeItem("highscores");
  while(leaderBoard.firstChild){
      leaderBoard.removeChild(leaderBoard.lastChild);
  }
})