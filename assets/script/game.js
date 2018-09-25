console.log("game running");

$(document).ready(function () {

  var game = {
    round: 1,
    timer: 10,
    guessRight: false,
    score: 0,
    lives: 3,
    questionLen: 8,
    randnum: 0,
    answered: "",
    guessWrong: false,
    speechWelcome: "",
    speechPunish: "",
    speechScream: "",
    speechCongrats: "",


    // ## SCARY IMAGES
    scare: ["./assets/imgs/scare1.gif", "./assets/imgs/scare2.gif", "./assets/imgs/scare3.gif", "./assets/imgs/scare4.gif", "./assets/imgs/scare5.gif", "./assets/imgs/scare6.gif", "./assets/imgs/scare7.gif", "./assets/imgs/scare8.gif", "./assets/imgs/scare9.gif", "./assets/imgs/scare10.gif",],


    // ## QQUESTOIN LIST
    questionList: [
      {
        question: "What movie was so scary, when the trailer was shown people ran out of the room, some even vomiting?",
        wrongAnswers: ["IT", "The Ring", "The Exorcist", "Halloween"],
        rightAnswer: "The Exorcist"
      },

      {
        question: "During the 70's and 80's, over 100 of perfectly healthy people died unexplainibly. This inspired Wes Craven with the idea to help create which movie?",
        wrongAnswers: ["28 Days Later", "The Blair Witch Project", "Nightmare on Elm Street", "Saw"],
        rightAnswer: "Nightmare on Elm Street"
      },

      {
        question: "What medieval machine was used to chop people's heads off?",
        wrongAnswers: ["the guillotine", "the iron maiden", "brazen bull", "the iron chair"],
        rightAnswer: "the guillotine"
      },

      {
        question: "What kind of pill has ruied relationships and have caused their partner to fall out of love?",
        wrongAnswers: ["anti-love", "anti-inflamitory", "methadone", "anti-depressants"],
        rightAnswer: "anti-depressants"
      },

      {
        question: "What did Queen Elizabeth I use to cover up the scares left on her face from smallpox as a child?",
        wrongAnswers: ["human nails", "human fat", "human blood", "human skin"],
        rightAnswer: "human fat"
      },

      {
        question: "Big Brother Watches everything- In 2015, how many CCTV's were in London?",
        wrongAnswers: ["224", "4224", "42,200", "422,000"],
        rightAnswer: "422,000"
      },

      {
        question: "According to the Catholic religion, where do souls go to suffer for the sins they commited while they were still alive?",
        wrongAnswers: ["Purgatory", "Hades", "Hell", "The Abyss"],
        rightAnswer: "Purgatory"
      },

      {
        question: "In Poveglia, Italy, How much of the soil is made from human bones?",
        wrongAnswers: ["None of it", "10%", "50%", "All of it",],
        rightAnswer: "50%"
      }
    ],


    // ## TIMER FUNCTION
    startTimer: function () {
      game.timer = 10;
      var timerFunc = setInterval(function () {
        game.timer--;
        if (game.guessWrong) {
          console.log("timerstopped within function: guessWrong");

          clearInterval(timerFunc);
        }
        if (game.guessRight) {
          console.log("timerstopped within function: guessRight");

          clearInterval(timerFunc);
        }
        if (game.timer === 0) {
          console.log("timerstopped within function: timer");
          clearInterval(timerFunc);
          game.lives--;
          game.punishmentScreen();
          console.log("TIMES OUT! Lives left: " + game.lives);

        }
        $("#timerDisp").html("Time left: " + game.timer);
        console.log("guessright: " + game.guessRight);
      }, 1000)

    },

    stopTimer: function () {
      console.log("stopTimer function initiated");
      console.log("stop timer; guessright: " + game.guessRight)
      if (game.guessRight === true) {
        console.log("stopping timer...");
        clearInterval(game.timerFunc);
        game.timer = 10;
        console.log("score: " + game.score)
      }
    },

    timesOut: function () {
      if (game.timer <= 0) {
        game.lives--;
        game.stopTimer();
        console.log("TIMES OUT! Lives left: " + game.lives);

      }
    },

    // ## RANDOMIZER 8
    rand: function () {
      game.randnum = Math.floor(Math.random() * (8))
    },





    // ## SOUNDS

    speechWel: function () {
      speechWelcome = document.createElement("audio");
      speechWelcome.setAttribute("src", "./assets/speech/wel1.wav");
      speechWelcome.play();
    },

    stopSpeWel: function () {
      speechWelcome.pause();
    },

    speechPunish: function () {
      speechPunish = document.createElement("audio");
      speechPunish.setAttribute("src", "./assets/speech/punish.wav");
      speechPunish.play();
    },

    stopSpePun: function () {
      speechPunish.pause();
    },

    speechScreem: function () {
      speechScream = document.createElement("audio");
      speechScream.setAttribute("src", "./assets/speech/scream.wav");
      speechScream.play();
    },

    speechCongrats: function () {
      speechCongrats = document.createElement("audio");
      speechCongrats.setAttribute("src", "./assets/speech/congrats.wav");
      speechCongrats.play();
    },

    stopSpeCon: function () {
      speechCongrats.pause();
    },

    speechGameOver: function() {
      speechGameOver = document.createElement("audio");
      speechGameOver.setAttribute("src", "./assets/speech/gameOver.wav");
      speechGameOver.play();
    },

    stopSpeGO: function() {
      speechGameOver.pause();

    },


    punishmentScreen: function () {
      game.round++
      game.speechPunish();
      $("#gameDisp").html(" ");
      $("#gameDisp").append($("<h2/>", { "class": "text-center welcome-text-head", text: "PUNISHMENT!" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "Now you lose a finger..." }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "Stick out your hand" }));
      $("#gameDisp").append($("<h2/>", { "class": "text-center welcome-text-detail", text: "chances left: " + game.lives }));
      $("#gameDisp").append($("<button/>", { "class": "btn btn-danger center-block col-md-4", type: "submit", text: "Proceed", id: "punishScreen-next" }));

      $("#punishScreen-next").on("click", function () {
        game.stopSpePun();
        game.speechScreem();
        $("#gameDisp").hide();

        let randy = Math.floor(Math.random() * 10);
        console.log(game.scare[randy])

        $("#punishDisp").hide();
        $("body").css("background", "url(" + game.scare[randy] + ")");
        $("body").css("background-size", "cover");
        $("body").css("background-repeat", "no-repeat");
        $("body").css("background-position", "center");
        $("body").css("background-color", "black");
        $("body").css("background-attachment", "fixed");

        setTimeout(function () {
          $("#punishDisp").hide();
          $("body").css("background", "url(./assets/imgs/bg.gif)");
          $("body").css("background-repeat", "no-repeat");
          $("body").css("background-position", "center");
          $("body").css("background-color", "black");
          $("body").css("background-attachment", "fixed");
          $("#gameDisp").fadeIn(1000);
          game.questionScreen();
        }, 1000 * 5);


      });
    },

    warningScreen: function () {
      $("#gameDisp").addClass("warningDisp");
      $("#gameDisp").append($("<h2/>", { "class": "text-center warning-text-head", text: "WARNING" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center warning-text-detail", text: "This game contains graphic images and sounds that may be too scary for easily scared players. Please proceed with caution." }));
      $("#gameDisp").append($("<button/>", { "class": "btn btn-warning center-block col-md-4", type: "submit", text: "Proceed", id: "welcomeScreen-next" }));

      $("#welcomeScreen-next").on("click", function () {
        game.welcomeScreen();
      });

    },


    welcomeScreen: function () {
      $("#gameDisp").removeClass("warningDisp");

      $("#gameDisp").html(" ");
      $("#gameDisp").append($("<h2/>", { "class": "text-center welcome-text-head", text: "welcome to Purgatory" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "You woke up in a abandoned medical facility" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "Strapped to the bed and unable to move, you hear a voice over the PA systems" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "Answer these next questions correctly within 10 seconds, and your life will be spared for another round... How long will your death be prolonged?" }));
      $("#gameDisp").append($("<button/>", { "class": "btn btn-danger center-block col-md-4", type: "submit", text: "Proceed", id: "welcomeScreen-next" }));

      setTimeout(function () {
        game.speechWel();
      }, 1000 * .5);

      $("#welcomeScreen-next").on("click", function () {
        game.questionScreen();
        game.stopSpeWel();
      });
    },

    livesOut: function () {
      if (game.lives === 0) {
        $("#gameDisp").html(" ");
        game.speechGameOver();
        $("#gameDisp").append($("<h2/>", { "class": "text-center welcome-text-head", text: "no more chances" }));
        $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "you're out of chances" }));
        $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "not a chance to spare" }));
        $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "it's time to meet your maker" }));
        $("#gameDisp").append($("<button/>", { "class": "btn btn-danger center-block col-md-4", type: "submit", text: "Proceed", id: "welcomeScreen-next" }));

      }
    },


    questionScreen: function () {
      game.rand();
      game.guessRight = false;
      game.guessWrong = false;
      game.startTimer();
      $("#gameDisp").html(" ");
      $("#gameDisp").append($("<div/>", { "class": "timerDisp", "id": "timerDisp", text: "Time left: 10" }));
      $("#gameDisp").append($("<h2/>", { "class": "text-center roundDisp", text: "Round: " + this.round + " Your question:" }));
      $("#gameDisp").append($("<h3/>", { "class": "question", text: this.questionList[game.randnum].question }));
      game.answerDisplay();
    },
    answerDisplay: function () {
      game.answered = [];
      for (var i = 0; i < 4; i++) {
        var allAnswer = $("<div>");
        allAnswer.addClass("allAnswer answers-display text-center");
        allAnswer.attr("id", "allAnswer")
        allAnswer.attr("data-answervalue", game.questionList[game.randnum].wrongAnswers[i])
        allAnswer.text(game.questionList[game.randnum].wrongAnswers[i]);
        $("#gameDisp").append(allAnswer);
        allAnswer.click(function () {
          points = ($(this).data("answervalue"));
          game.answered += points;
          if (game.answered === game.questionList[game.randnum].rightAnswer) {
            game.score += game.timer + 1;
            game.guessRight = true;
            console.log("You live another round...");
            game.rigthAnswerDisplay();
          } else {
            game.lives--;
            game.guessWrong = true
            console.log("PUNISHMENT!");

            // game.punishmentScreen();
            // game.livesOut();

                 if (game.lives === 0) {
          game.livesOut();
        } else {
          game.punishmentScreen();
        }

          }
        });
      }
    },

    rigthAnswerDisplay: function () {
      game.speechCongrats();
      game.stopTimer();
      game.round++
      $("#gameDisp").html(" ");
      $("#gameDisp").addClass("congratsDisp");
      $("#gameDisp").append($("<h2/>", { "class": "text-center", text: "you survived this time..." }));
      $("#gameDisp").append($("<h2/>", { "class": "text-center", text: "your current score: " + game.score }));
      $("#gameDisp").append($("<button/>", { "class": "btn btn-danger col-md-4", type: "submit", text: "Proceed", id: "rightAnswerDisplay-next" }));
      $("#rightAnswerDisplay-next").on("click", function () {
        $("#gameDisp").removeClass("congratsDisp");
        game.stopSpeCon();
        game.questionScreen();
      });
    }
  }

  // ## STARTING GAME
  game.warningScreen();

});