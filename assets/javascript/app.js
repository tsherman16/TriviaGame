$(document).ready(function () {

    //variables======================================================================
    var trivia = {
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        counter: 0,
        questionIndex: 0,
        Q1: {
            question: "The Arizona Cardinals moved to the Grand Canyon state in:",
            choices: ["1977", "1988", "1991"],
            answer: "1988"
        },
        Q2: {
            question: "Where did the Cardinals play home games before moving to University of Phoenix Stadium in 2006?",
            choices: ["Sun Devil Stadium", "Chase Field", "Arizona Stadium"],
            answer: "Sun Devil Stadium"
        },
        Q3: {
            question: "How many Cardinals are currently enshrined in the Pro Football Hall of Fame?",
            choices: ["9", "12", "17"],
            answer: "12"
        },
        Q4: {
            question: "Who holds the Cardinals’ single-game record for most receiving yards?",
            choices: ["Anquan Boldin", "Larry Fitzgerald", "Sonny Randle"],
            answer: "Sonny Randle"
        },
        Q5: {
            question: "Where did the Cardinals franchise play right before it moved to Arizona?",
            choices: ["St. Louis", "Los Angeles", "Chicago"],
            answer: "St. Louis"
        },
        Q6: {
            question: "Who has the most passing yards in team history?",
            choices: ["Kurt Warner", "Jake Plummer", "Jim Hart"],
            answer: "Jim Hart"
        },
        Q7: {
            question: "When was the last time the Cardinals made the NFL playoffs?",
            choices: ["2008", "2009", "2006"],
            answer: "2009"
        },
        Q8: {
            question: "In franchise history, which team have the Cardinals beat the most?",
            choices: ["The Philadelphia Eagles", "The New York Giants", "The Washington Redskins"],
            answer: "The Philadelphia Eagles"
        },
        Q9: {
            question: "Who became the first Cardinal to catch passes for over 1,500 yards in one season?",
            choices: ["Larry Fitzgerald", "Roy Green", "Don Coryell"],
            answer: "Roy Green"
        },
        Q10: {
            question: "Which Cardinal was nicknamed 'The Snake'?",
            choices: ["Jake Plummer", "Carson Palmer", "Kurt Warner"],
            answer: "Jake Plummer"
        },
        getQuestionObject: function (index) {
            switch (index) {
                case 0: return this.Q1; break;
                case 1: return this.Q2; break;
                case 2: return this.Q3; break;
                case 3: return this.Q4; break;
                case 4: return this.Q5; break;
                case 5: return this.Q6; break;
                case 6: return this.Q7; break;
                case 7: return this.Q8; break;
                case 8: return this.Q9; break;
                case 9: return this.Q10; break;
                default: return undefined; break;
            }
        }
    }

    //Start game=======================================================================
    $(".question-display").hide();
    $(document).on("click", "#startGame1", function () {
        $(".question-display").show();
        countdown();
        Q_and_A();
        $(this).detach();
    });


    //functions==================================================================
    function countdown() {
        clearInterval(trivia.counter);
        var count = 10;
        trivia.counter = setInterval(timer, 1000);
        function timer() {
            count--;
            if (count <= 0) {
                trivia.questionIndex++;
                trivia.unanswered++;
                alert("Times Up! Get faster before the season!");
                clearInterval(trivia.counter);
                Q_and_A();
            }
            $("#Timer").html(count + " Seconds Remaining")
        }
    }

    function Q_and_A() {
        emptyElement(".q1");
        emptyElement(".a1");
        emptyElement(".a2");
        emptyElement(".a3");

        countdown();

        $(".q1").html(trivia.getQuestionObject(trivia.questionIndex).question);
        var buttonIndex = 1;
        trivia.getQuestionObject(trivia.questionIndex).choices.forEach(function (answer) {
            let answerBtn = $("<button>");
            answerBtn.addClass("choices");
            answerBtn.text(answer);
            $(".a" + buttonIndex).append(answerBtn);
            buttonIndex++;
        });
    }

    $(document).on("click", ".choices", function () {
        var userAnswer = $(this).text();
        if (trivia.getQuestionObject(trivia.questionIndex).answer === userAnswer) {
            trivia.correct++;
            alert("Correct! #fanfavorite #loyalfan");
        } else {
            trivia.incorrect++;
            alert("WRONG! Answer is " + trivia.getQuestionObject(trivia.questionIndex).answer);
        }
        trivia.questionIndex++;
        clearInterval(trivia.counter);
        if (trivia.getQuestionObject(trivia.questionIndex) === undefined) {
            endGame();
        } else {
            Q_and_A();
        }
    })

    function endGame() {
        emptyElement(".q1");
        emptyElement(".a1");
        emptyElement(".a2");
        emptyElement(".a3");
        emptyElement("#Timer");

        $("#Timer").text("Results")
        $(".a1").text("Correct: " + trivia.correct);
        $(".a2").text("Incorrect: " + trivia.incorrect);
        $(".a3").text("Unanswered: " + trivia.unanswered);
    }

    function emptyElement(el) {
        $(el).empty();
    }
});