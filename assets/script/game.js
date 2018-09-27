console.log("game running");

$(document).ready(function () {

  var game = {
    round: 1,
    timer: 20,
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
    backgroundMusic: "",
    speechTimeOut: "",
    playedArr: [],
    highScore: 0,
    highRound: 0,
    randomPicker: false,


    // ## SCARY IMAGES
    scare: ["./assets/imgs/scare1.gif", "./assets/imgs/scare2.gif", "./assets/imgs/scare3.gif", "./assets/imgs/scare4.gif", "./assets/imgs/scare5.gif", "./assets/imgs/scare6.gif", "./assets/imgs/scare7.gif", "./assets/imgs/scare8.gif", "./assets/imgs/scare9.gif", "./assets/imgs/scare10.gif", "./assets/imgs/scare11.gif", "./assets/imgs/scare12.gif", "./assets/imgs/scare13.gif", "./assets/imgs/scare14.gif", "./assets/imgs/scare15.gif", "./assets/imgs/scare16.gif", "./assets/imgs/scare17.gif", "./assets/imgs/scare18.gif", "./assets/imgs/scare19.gif", "./assets/imgs/scare20.gif", "./assets/imgs/scare21.gif", "./assets/imgs/scare22.gif", "./assets/imgs/scare23.gif", "./assets/imgs/scare24.gif", "./assets/imgs/scare25.gif", "./assets/imgs/scare26.gif", "./assets/imgs/scare27.gif", "./assets/imgs/scare28.gif", "./assets/imgs/scare29.gif", "./assets/imgs/scare30.gif",],


    // ## QQUESTOIN LIST
    questionList: [
      {
        question: "What movie was so scary, when the trailer was shown people ran out of the room, some even vomiting?",
        wrongAnswers: ["IT", "The Ring", "The Exorcist", "Halloween"],
        rightAnswer: "The Exorcist",
        id: 1
      },

      {
        question: "During the 70's and 80's, over 100 of perfectly healthy people died unexplainibly. This inspired Wes Craven with the idea to help create which movie?",
        wrongAnswers: ["28 Days Later", "The Blair Witch Project", "Nightmare on Elm Street", "Saw"],
        rightAnswer: "Nightmare on Elm Street",
        id: 2
      },

      {
        question: "What medieval machine was used to chop people's heads off?",
        wrongAnswers: ["the guillotine", "the iron maiden", "brazen bull", "the iron chair"],
        rightAnswer: "the guillotine",
        id: 3
      },

      {
        question: "What kind of pill has ruied relationships and have caused their partner to fall out of love?",
        wrongAnswers: ["anti-love", "anti-inflamitory", "methadone", "anti-depressants"],
        rightAnswer: "anti-depressants",
        id: 4
      },

      {
        question: "What did Queen Elizabeth I use to cover up the scares left on her face from smallpox as a child?",
        wrongAnswers: ["human nails", "human fat", "human blood", "human skin"],
        rightAnswer: "human fat",
        id: 5
      },

      {
        question: "Big Brother Watches everything- In 2015, how many CCTV's were in London?",
        wrongAnswers: ["224", "4,224", "42,200", "422,000"],
        rightAnswer: "422,000",
        id: 6
      },

      {
        question: "According to the Catholic religion, where do souls go to suffer for the sins they commited while they were still alive?",
        wrongAnswers: ["Purgatory", "Hades", "Hell", "The Abyss"],
        rightAnswer: "Purgatory",
        id: 7
      },

      {
        question: "What is a Rat King?",
        wrongAnswers: ["a giant rat", "when a group of rats become fused together by their tails", "A medviel rat that were a prized find by hunters", "A story made up by parents to scare their children into sleeping"],
        rightAnswer: "when a group of rats become fused together by their tails",
        id: 8
      },

      {
        question: "How long can a human head remain conscious AFTER it's been decapitated?",
        wrongAnswers: ["It immediately loses consciousness", "20 seconds", "1 minute", "Forever!"],
        rightAnswer: "20 seconds",
        id: 9
      },

      {
        question: "Anually, about how many people die due to a doctor's poor hand writing?",
        wrongAnswers: ["7000", "700", "70", "None"],
        rightAnswer: "7000",
        id: 10
      },

      {
        question: "In Poveglia, Italy, How much of the soil is made from human bones?",
        wrongAnswers: ["None of it", "10%", "50%", "All of it",],
        rightAnswer: "50%",
        id: 11
      },

      {
        question: "What kind of professional invented the eletric chair?",
        wrongAnswers: ["Dentist", "Teacher", "Lawyer", "Doctor",],
        rightAnswer: "Dentist",
        id: 12
      },

      {
        question: "How many people die from choking on ballpoint pens every year?",
        wrongAnswers: ["1000", "100", "10", "None",],
        rightAnswer: "1000",
        id: 13
      },

      {
        question: "How long can a cockroach survive without it's head?",
        wrongAnswers: ["It will die immediately", "9 days", "9 hours", "9 minutes",],
        rightAnswer: "9 days",
        id: 14
      },

      {
        question: "Where are you most likely to find a dead body?",
        wrongAnswers: ["Under your bed", "In your closet", "The trunk of your car", "In your garbage",],
        rightAnswer: "Under your bed",
        id: 15
      },

      {
        question: "Once, a man who recieved a donor heart from a suicide victim married the donor's widow. He then killed himself the exact same way as the donor did",
        wrongAnswers: ["True", "False",],
        rightAnswer: "True",
        id: 16
      }
    ],


    // ## TIMER FUNCTION
    startTimer: function () {
      game.timer = 20;
      var timerFunc = setInterval(function () {
        game.timer--;
        if (game.guessWrong) {
          console.log("timerstopped within function: guessWrong");
          clearInterval(timerFunc);
        }

        else if (game.guessRight) {
          console.log("timerstopped within function: guessRight");
          clearInterval(timerFunc);
        }

        else if (game.timer === 0) {
          console.log("timerstopped within function: timer");
          clearInterval(timerFunc);
          game.lives--;
          if (game.lives === 0) {
            game.livesOut();
          } else {
            game.timeOutPunishmentScreen();
          }

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

    // ## RANDOMIZER 16
    rand: function () {
      let randy = Math.floor(Math.random() * (16))
      if (this.playedArr.includes(randy)) {
        game.randomPicker = false;
        console.log("rand function picked duplicate number, picking again...");
        game.rand();
      } else if (this.playedArr.length === 15) {

      } else {
        game.randomPicker = true;
        console.log("original number picked");
        console.log("length of playedArr: " + this.playedArr.length)
        game.playedArr.push(randy);
        game.randnum = randy
      }
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

    speechGameOver: function () {
      speechGameOver = document.createElement("audio");
      speechGameOver.setAttribute("src", "./assets/speech/gameOver.wav");
      speechGameOver.play();
    },

    stopSpeGO: function () {
      speechGameOver.pause();
    },

    backgroundMusic: function () {
      backgroundMusic = document.createElement("audio");
      backgroundMusic.setAttribute("src", "./assets/speech/bgMusic.mp3");
      backgroundMusic.play();
    },

    stopSpeBGM: function () {
      backgroundMusic.pause();
    },

    gameMenubgMusic: function () {
      gameMenubgMusic = document.createElement("audio");
      gameMenubgMusic.setAttribute("src", "./assets/music/gameMenu-bgMusic.mp3");
      gameMenubgMusic.play();
    },

    stopGameMenubgMusic: function () {
      gameMenubgMusic.pause();
    },

    click: function () {
      click = document.createElement("audio");
      click.setAttribute("src", "./assets/music/click.wav");
      click.play();
    },

    stopClick: function () {
      click.pause();
    },

    speechTimeOut: function () {
      speechTimeOut = document.createElement("audio");
      speechTimeOut.setAttribute("src", "./assets/speech/timeOut.wav");
      speechTimeOut.play();
    },

    stopSpeTO: function () {
      speechTimeOut.pause();
    },

    timeOutPunishmentScreen: function () {
      game.round++
      game.speechTimeOut();
      $("#gameDisp").html(" ");
      $("#gameDisp").append($("<h2/>", { "class": "text-center welcome-text-head", text: "time is OUT!!" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "don't take so long" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "you lose another finger.." }));
      $("#gameDisp").append($("<h2/>", { "class": "text-center welcome-text-detail", text: "chances left: " + game.lives }));
      $("#gameDisp").append($("<p/>", { "class": "button", text: "Proceed", id: "punishScreen-next" }));

      $("#punishScreen-next").on("click", function () {
        game.click();
        game.stopSpeTO();
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




    punishmentScreen: function () {
      game.round++
      game.speechPunish();
      $("#gameDisp").html(" ");
      $("#gameDisp").append($("<h2/>", { "class": "text-center welcome-text-head", text: "PUNISHMENT!" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "Now you lose a finger..." }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "Stick out your hand" }));
      $("#gameDisp").append($("<h2/>", { "class": "text-center welcome-text-detail", text: "chances left: " + game.lives }));
      $("#gameDisp").append($("<p/>", { "class": "button", text: "Proceed", id: "punishScreen-next" }));
      $("#gameDisp").fadeIn(100)

      $("#punishScreen-next").on("click", function () {
        game.click();
        game.stopSpePun();
        game.speechScreem();
        $("#gameDisp").hide();

        let randy = Math.floor(Math.random() * 30);
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
      $("#gameDisp").append($("<span/>", { "class": "button", text: "Proceed", id: "welcomeScreen-next" }));

      $("#welcomeScreen-next").on("click", function () {
        $("#gameDisp").fadeOut(800)


        game.click();

        setTimeout(function () {
          game.gameMenu();

        }, 1255);

      });

    },

    gameMenu: function () {
      $("body").css("background", "url(./assets/imgs/bg.gif)");
      $("body").css("background-repeat", "no-repeat");
      $("body").css("background-position", "center");
      $("body").css("background-color", "black");
      $("body").css("background-attachment", "fixed");

      $("#gameDisp").fadeIn(1000)
      game.gameMenubgMusic();
      $("#gameDisp").html(" ");
      $("#gameDisp").addClass("game-menu");
      $("#gameDisp").append($("<h2/>", { "class": "text-center welcome-text-head", text: "welcome to Purgatory" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "A Scary Trivia Game" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "High Score: " + game.highScore }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "Highest Round: " + game.highRound }));



      $("#gameDisp").append($("<span/>", { class: "button", id: "playButton", text: "Play" }))
      $("#playButton").click(function () {
        game.click();
        game.stopGameMenubgMusic();
        game.welcomeScreen();
      });

    },


    welcomeScreen: function () {
      game.round = 1;
      game.timer = 20;
      game.score = 0;
      game.lives = 3;
      game.playedArr = [];

      game.backgroundMusic()
      $("#gameDisp").hide()
      $("#gameDisp").removeClass("warningDisp");

      $("#gameDisp").html(" ");
      $("#gameDisp").append($("<h2/>", { "class": "text-center welcome-text-head", text: "welcome to Purgatory" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "You woke up in a abandoned medical facility" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "Strapped to the bed and unable to move, you hear a voice over the PA systems" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "Answer these next questions correctly within 20 seconds, and your life will be spared for another round... How long will your death be prolonged?" }));
      $("#gameDisp").append($("<span/>", { "class": "button", text: "Proceed", id: "welcomeScreen-next" }));
      $("#gameDisp").fadeIn(1500)

      setTimeout(function () {
        game.speechWel();
      }, 1000 * .5);

      $("#welcomeScreen-next").on("click", function () {
        $("#gameDisp").fadeOut()
        game.click();

        setTimeout(function () {
          game.questionScreen();
          game.stopSpeWel();
        }, 500);


      });
    },

    questionScreen: function () {
      $("#gameDisp").fadeIn(100)

      game.rand();
      if (game.randomPicker === true) {
        game.randomPicker = false;
        game.guessRight = false;
        game.guessWrong = false;
        game.startTimer();
        $("#gameDisp").html(" ");
        $("#gameDisp").append($("<div/>", { "class": "timerDisp", "id": "timerDisp", text: "Time left: 20" }));
        $("#gameDisp").append($("<h2/>", { "class": "text-center roundDisp", text: "Round: " + this.round }));
        $("#gameDisp").append($("<h2/>", { "class": "text-center roundDisp", text: "Your Question:" }));
        $("#gameDisp").append($("<h3/>", { "class": "question", text: this.questionList[game.randnum].question }));
        game.answerDisplay();
      } else {
        game.survived();
      }
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
          $("#gameDisp").fadeOut(100)
          game.click();
          points = ($(this).data("answervalue"));
          game.answered += points;
          setTimeout(function () {
            if (game.answered === game.questionList[game.randnum].rightAnswer) {
              game.score += game.timer + 1;
              game.guessRight = true;
              console.log("You live another round...");
              game.rigthAnswerDisplay();
            } else {
              game.lives--;
              game.guessWrong = true
              console.log("PUNISHMENT!");

              if (game.lives === 0) {
                game.livesOut();
              } else {
                game.punishmentScreen();
              }

            }
          }, 500);
        });
      }
    },

    rigthAnswerDisplay: function () {
      $("#gameDisp").fadeIn(100)
      game.speechCongrats();
      game.stopTimer();
      game.round++
      $("#gameDisp").html(" ");
      $("#gameDisp").addClass("congratsDisp");
      $("#gameDisp").append($("<h2/>", { "class": "text-center", text: "you survived this time..." }));
      $("#gameDisp").append($("<h2/>", { "class": "text-center", text: "shall we keep going?" }));
      $("#gameDisp").append($("<h2/>", { "class": "text-center", text: "your current score: " + game.score }));
      $("#gameDisp").append($("<h2/>", { "class": "text-center", text: "chances left: " + game.lives }));
      $("#gameDisp").append($("<span/>", { "class": "button", text: "Proceed", id: "rightAnswerDisplay-next" }));
      $("#rightAnswerDisplay-next").on("click", function () {
        game.click();
        $("#gameDisp").removeClass("congratsDisp");
        game.stopSpeCon();
        game.questionScreen();
      });
    },

    survived: function () {
      $("#gameDisp").fadeIn(100)
      // update high score and high rounds
      if (game.highScore < game.score) {
        game.highScore = game.score
      }
      if (game.highRound < game.round) {
        game.highRound = game.round
      }
      $("#gameDisp").html(" ");
      $("#gameDisp").append($("<h2/>", { "class": "text-center welcome-text-head", text: "you survived all my questions" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "you're still gonna die" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "happy halloween!" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "final score: " + game.score }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "you made it to round: " + game.round }));
      $("#gameDisp").append($("<p/>", { "class": "button", text: "Quit", id: "quit-next" }));
      $("#gameDisp").append($("<p/>", { "class": "button", text: "Play Again", id: "play-again-next" }));
      $("#quit-next").click(function () {
        game.click();
        location.assign(url("https://www.google.com"));
      });

      $("#play-again-next").click(function () {
        game.click();
        console.log(game.lives);
        game.stopSpeBGM();
        game.gameMenu();
      });
    },

    endScreen: function () {
      $("#gameDisp").html(" ");
      $("#gameDisp").append($("<h2/>", { "class": "text-center welcome-text-head", text: "Game Over" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "nice try, but you died" }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "final score: " + game.score }));
      $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "you made it to round: " + game.round }));
      $("#gameDisp").append($("<p/>", { "class": "button", text: "Quit", id: "quit-next" }));
      $("#gameDisp").append($("<p/>", { "class": "button", text: "Game Menu", id: "play-again-next" }));

      $("#quit-next").click(function () {
        game.click();
        location.assign(url("https://www.google.com"));
      });

      $("#play-again-next").click(function () {
        game.click();
        console.log(game.lives);
        game.stopSpeBGM();
        game.gameMenu();
      });

    },

    livesOut: function () {
      $("#gameDisp").fadeIn(100)
      if (game.lives === 0) {

        // update high score and high rounds
        if (game.highScore < game.score) {
          game.highScore = game.score
        }

        if (game.highRound < game.round) {
          game.highRound = game.round
        }

        $("#gameDisp").html(" ");
        game.speechGameOver();
        $("#gameDisp").append($("<h2/>", { "class": "text-center welcome-text-head", text: "no more chances" }));
        $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "you're out of chances" }));
        $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "not a chance to spare" }));
        $("#gameDisp").append($("<p/>", { "class": "text-center welcome-text-detail", text: "it's time to meet your maker" }));
        $("#gameDisp").append($("<p/>", { "class": "button", text: "Proceed", id: "livesOut-next" }));

        $("#livesOut-next").click(function () {
          game.stopSpeGO();
          game.death();

        });
      }
    },

    death: function () {
      $("#gameDisp").hide();

      let randy = Math.floor(Math.random() * 30);
      console.log(game.scare[randy])
      $("body").css("background", "url(" + game.scare[randy] + ")");
      $("body").css("background-size", "cover");
      $("body").css("background-repeat", "no-repeat");
      $("body").css("background-position", "center");
      $("body").css("background-color", "black");
      $("body").css("background-attachment", "fixed");


      setTimeout(function () {
        $("#gameDisp").show();
        game.endScreen();
      }, 5000);
    }
  }

  // ## STARTING GAME
  game.warningScreen();

});