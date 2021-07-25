class Quiz {
  constructor() { }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if (contestantCountRef.exists()) {
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play() {
    //write code here to hide question elements
    /*if (question && question.input1) {
      question.input1.hide();
    }

    if (question && question.input2) {
      question.input2.hide();
    }




    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    if (question && !question.title) {

      question.title.html("Result of the Quiz");

    }
*/

    //call getContestantInfo( ) here

    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if (allContestants !== undefined) {
      question.title.html("Result of the Quiz");
      if (question && question.input1) {
        question.input1.hide();
      }
      if (question && question.input2) {
        question.input2.hide();
      }
      if (question && question.button) {
        question.button.hide();
      }
      question.title1 = createElement("h2")
      question.title1.html("<p style='color:blue'>Note: Contestant who answered correct are highlighted in green color !!</p>")
      question.title1.position(100, 200);

      var i = 0;
     
      for (var contestant in allContestants) {
        if (allContestants.hasOwnProperty(contestant)) {
          i += 50
          if (allContestants[contestant].answer === '2') {            
            question.title2 = createElement("p")
            question.title2.html("<p style='color:green'>" + allContestants[contestant].name + ': ' + allContestants[contestant].answer + "<p>")
            question.title2.position(100, 200 +i);
          }
          else {
            question.title2 = createElement("p")
            question.title2.html("<p style='color:red'>" + allContestants[contestant].name + ': ' + allContestants[contestant].answer + "<p>")
            question.title2.position(100, 200 +i);
          }
        }
      }



    }
    //write code to add a note here

    //write code to highlight contest who answered correctly

  }

}
