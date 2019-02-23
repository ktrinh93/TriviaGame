$(document).ready(function() {

    var start = $("#start-button");
    var seconds = $("#seconds");
    var question = $("#question");
    var option1 = $("#option1");
    var option2 = $("#option2");
    var option3 = $("#option3");
    var option4 = $("#option4");

    var timeLeft;
    var intervalId;
    var timerRunning = false;
    var gameOver = false;
    var acceptingAnswers;

    var questionsArray = [];
    var currentQuestionNumber;
    var correctAnswer;
    var userAnswer;
    
    var numberCorrect;
    var numberIncorrect;
    var numberUnanswered;

    // constructor for TriviaQuestion object
    function TriviaQuestion(q, a, wa1, wa2, wa3) {
        this.q = q;
        this.a = a;
        this.wa1 = wa1;
        this.wa2 = wa2;
        this.wa3 = wa3;
    }
    
    // calls a trivia API to get questions and answers
    // parses them and creates TriviaQuestion objects
    function generateTriviaQuestions() {

        $.ajax({
            url: "https://opentdb.com/api.php?amount=7&category=18&difficulty=easy&type=multiple",
            method: "GET"
        }).then(function(response) {
            var qandas = response.results;
            
            for(var i = 0; i < qandas.length; i++) {
                var qObject = qandas[i];
                var q = new TriviaQuestion(qObject.question, qObject.correct_answer, qObject.incorrect_answers[0], qObject.incorrect_answers[1], qObject.incorrect_answers[2]);
                questionsArray.push(q);
                shuffle(questionsArray);
            }
        });
    }

    // create the first set of questions
    generateTriviaQuestions();

    // executes at the start of the game
    // (re)setting to initial game state
    start.on("click", function() {
        start.attr("style", "display: none");
        $(".content").attr("style", "display: inherit");
        $(".score").attr("style", "display: none");
        $("#title").text("Trivia Game!");
        currentQuestionNumber = 0;
        numberCorrect = 0;
        numberIncorrect = 0;
        numberUnanswered = 0;
        gameOver = false;
        newQuestion();
    });

    function newQuestion() {
        // switch to prevent "multiple" on click triggers
        acceptingAnswers = true;

        // sets timer for question
        timeLeft = 10;
        seconds.text(timeLeft);
        if(!timerRunning) {
            intervalId = setInterval(questionTimer, 1000);
            timerRunning = true;
        }

        // gets a question from the question array
        var currentQuestion = questionsArray[currentQuestionNumber++];
        // gets answers for the questions and shuffles them
        var answers = [currentQuestion.a, currentQuestion.wa1, currentQuestion.wa2, currentQuestion.wa3];
        shuffle(answers);
        // saves the correct answer;
        correctAnswer = currentQuestion.a;

        // populates HTML with the question and choices
        question.text(currentQuestion.q);
        option1.text(answers[0]);
        option2.text(answers[1]);
        option3.text(answers[2]);
        option4.text(answers[3]);

        // makes the content visible to the user
        $(".content").attr("style", "display: inherit");

        // checks if the game is over (aka, on the last question)
        gameOver = (currentQuestionNumber == questionsArray.length);
        
        // when a choice is clicked
        $(".choices").on("click", function() {
            if(acceptingAnswers) {
                // locks out click triggers
                acceptingAnswers = false;

                // stop the timer for the question
                stopTimer();

                // gets the answer the user clicked on
                userAnswer = this.firstElementChild.innerText;

                // if user guesses in/correctly
                if(userAnswer == correctAnswer) {
                    correctAnswerScreen();
                }
                else {
                    incorrectAnswerScreen(false);
                }
            }
        });
        
    }

    // screen that shows when user clicks the correct answer
    function correctAnswerScreen() {

        hideForAnswerScreen();
        numberCorrect++;
        question.text("Congrats! You guessed the right answer!");

        if(!gameOver) {
            setTimeout(newQuestion, 3000);
        }
        else {
            setTimeout(endGameScreen, 3000);
        }
    }

    // screen that shows when user clicks the incorrect answer or runs out of time
    // probably should have split this into two separate methods instead of passing a flag
    function incorrectAnswerScreen(outOfTime) {

        hideForAnswerScreen();
        if(!outOfTime) {
            numberIncorrect++;
            question.text("You guessed the wrong answer :( The correct answer was: " + correctAnswer);
        }
        else {
            numberUnanswered++;
            question.text("You ran out of time! The correct answer was: " + correctAnswer);
        }

        if(!gameOver) {
            setTimeout(newQuestion, 3000);
        }
        else {
            setTimeout(endGameScreen, 3000);
        }
    }

    // shows/hides appropriate elements with end game data
    function endGameScreen() {
        questionsArray = [];
        generateTriviaQuestions();
        $(".content").attr("style", "display: none")
        $("#title").text("Game Over! Here is your score!");
        $("#correct").text(numberCorrect);
        $("#incorrect").text(numberIncorrect);
        $("#unanswered").text(numberUnanswered);
        $(".score").attr("style", "display: inherit");
        start.text("Click to play again!");
        start.attr("style", "display: inherit");
    }

    // hides the choices from the user
    function hideForAnswerScreen() {
        $(".choices").attr("style", "display: none");
    }

    // decrements the timeLeft counter
    function questionTimer() {
        timeLeft--;

        // if there is no time left
        if(timeLeft == 0) {
            stopTimer();
            incorrectAnswerScreen(correctAnswer, true);
        }

        // updates HTML with the seconds remaining
        seconds.text(timeLeft);
    }

    function stopTimer() {
        clearInterval(intervalId);
        timerRunning = false;
    }

    // copied from https://www.frankmitchell.org/2015/01/fisher-yates/
    function shuffle (array) {
        var i = 0;
        var j = 0;
        var temp = null;
      
        for (i = array.length - 1; i > 0; i -= 1) {
          j = Math.floor(Math.random() * (i + 1));
          temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
   
});