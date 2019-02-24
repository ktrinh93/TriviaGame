# TriviaGame

A timed trivia game that focuses on the use of JS timers. Once the user clicks the start button, the game will send a get request to a trivia API, where it will then parse and ask the player seven computer-themed trivia questions.

If a correct answer is selected, the game will inform the player of their correct guess.
If an incorrect answer is selected, the game will inform the player of the correct guess.
If no answer is selected by the time the question timer reaches zero, the game will inform the player of the correct guess.

After all seven questions have been asked/answered, the game will display the user's score, which shows how many questions they answered correctly, incorrectly, or left blank.

The user is then given the option to play again. This will call the trivia API again for a new set of questions.

NOTE: There is an unexpected "bug" where certain special characters (like the apostrophe, quotation mark, ampersand, etc.) are returned in the API's response body and show up in the browser as UTF-8 character codes despite the HTML meta charset being set to UFT-8 encoding. Pseudocode to fix this would be to see if the strings (questions and answers) .includes("encoded characters"). If that is true, then do a string.replace("encoded characters", decoded characters). The main reason for not doing this is that doing it would significantly slow down the performance of the game.
