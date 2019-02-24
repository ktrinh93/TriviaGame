# TriviaGame

A timed trivia game that focuses on the use of JS timers. Once the user clicks the start button, the game will send a get request to a trivia API, where it will then parse and ask the player seven computer-themed trivia questions.

If a correct answer is selected, the game will inform the player of their correct guess.
If an incorrect answer is selected, the game will inform the player of the correct guess.
If no answer is selected by the time the question timer reaches zero, the game will inform the player of the correct guess.

After all seven questions have been asked/answered, the game will display the user's score, which shows how many questions they answered correctly, incorrectly, or left blank.

The user is then given the option to play again. This will call the trivia API again for a new set of questions.
