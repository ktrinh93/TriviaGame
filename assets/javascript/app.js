$(document).ready(function() {

    var seconds = $("#seconds");
    var question = $("#question");
    var option1 = $("#option1");
    var option2 = $("#option2");
    var option3 = $("#option3");
    var option4 = $("#option4");

    var questionsanswers = [
        ["question 1", ["q1ans1", "q1ans2", "q1ans3", "q1ans3"]],
        ["question 2", ["q2ans1", "q2ans2", "q2ans3", "q2ans3"]],
        ["question 3", ["q3ans1", "q3ans2", "q3ans3", "q3ans3"]],
        ["question 4", ["q4ans1", "q4ans2", "q4ans3", "q4ans3"]],
        ["question 5", ["q5ans1", "q5ans2", "q5ans3", "q5ans3"]]
    ]

    question.on("click", function() {
        for(var i = 0; i < questionsanswers.length; i++) {
            question.text(questionsanswers[i][0]);
            option1.text(questionsanswers[i][1][0]);
            option2.text(questionsanswers[i][1][1]);
            option3.text(questionsanswers[i][1][2]);
            option4.text(questionsanswers[i][1][3]);
        }
    });
   
    // okay i think im at a good spot to stop working on this now
    // thanks for everyone who showed up
    // will be ending the stream now
    // until next time, cya!

});