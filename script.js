//question array
    var questions = [
        {q:"1. What is the best language to style your website?",
        a: ['HTML', 'CSS', 'Javascript', 'API'],
        c: 2},
    
       {q:"2. What is the best language to structure your text?",
        a: ['HTML', 'CSS', 'Javascript', 'API'],
        c: 2},
    
        {q:"3. What is the best language for creating loops?",
        a: ['HTML', 'CSS', 'Javascript', 'API'],
        c: 2},
    
        {q:"4. What is the best tool to pull data from websiter?",
        a: ['HTML', 'CSS', 'Javascript', 'API'],
        c: 2}

    ];

    

//correct answers stored here
    var correctA = ['CSS','HTML','Javascript', 'API'];
    var qdiv = document.getElementById('qdiv');
    var adiv = document.getElementById('adiv');
    var ques1 = document.getElementById("q1"); 
    var hScores = document.getElementById("hS");
    var currentQ = 0;
    var timeSpan = document.getElementById('timeSpan')
    var qContainer = document.getElementById('qContainer')
    var boardOfScores = document.getElementById('scoreBoard')
    var newScore = []
// sets the start time on the clock
    var time = 5;
    var timer;
// stores user scores and times
    var scoreBoard = [];

//adds click functionality to start button
    ques1.addEventListener('click', function(){ 
        boardOfScores.classList.add("hide");
        qContainer.classList.remove("hide");
        alert('You have 60 second to finish this multiple choice test.  Every wrong answer will deduct 5 seconds from your time.  Your final score will be your remaining time when you finish the last question.');
        time=60
        timer = setInterval(timeFunc, 1000)
        writeQ()
    });


    
    
    
//tells the game to stop once the clock reache zero
    function timeFunc(){
        if(time=== 0){
            clearInterval(timer)
            gameOver()
        }
        timeSpan.innerText = time;
        time --;
    }
    
    
    function writeQ(){
        //write the question and answers on the page
        if(currentQ === questions.length){
            gameOver()
        }
        else{
            var h3 = document.createElement('h3');
            h3.innerHTML = questions[currentQ].q;
            qdiv.innerHTML = '';
            adiv.innerHTML = '';
            qdiv.appendChild(h3)
            for(var i = 0; i< questions[currentQ].a.length; i++){
                var btn = document.createElement('button');
                btn.innerText = questions[currentQ].a[i];
                adiv.appendChild(btn);
                btn.addEventListener('click', function(){
                    
                    
//check if answer correct
                    checkAnswer(this.innerText)})
            } 
        }    
    }
        
        
        //returns "yay" for right answer. deducts time and returns "try again" for wrong
        function checkAnswer(choice){
            if(choice === correctA[currentQ]){
                alert('Great Job!');
                currentQ ++;
                writeQ()
            }else{
                alert('Wrong answer! Try again!');
                time -= 5;
            }
        }
        
        //left off here.  should publish scores to score board. executes at the end of the game.  Allerts "game over".
        function gameOver(){
            qContainer.classList.add("hside");
            currentQ = 0;
            clearInterval(timer)
            var initials = prompt ('Gameover! Enter your initials here and check your score on the score board.')
            
            var userInfo = {
                userInitials: initials,
                timeLeft: time
            }
            scoreBoard.push(userInfo);
            localStorage.setItem("allScores", JSON.stringify(scoreBoard))
            console.log(localStorage)
            
        }   
        
        //   
            hScores.addEventListener('click',function(){
                boardOfScores.classList.remove("hide");
                    var theScores = JSON.parse (localStorage.getItem("allScores")) 
                    console.log(theScores)
                    for (var i=0; i<theScores.length; i++ ){
           
                        boardOfScores.innerHTML="<div>" + theScores[i].userInitials + "</div>" + " " + "<div>" + theScores[i].timeLeft + "</div>";
                    }   
                 
            });
        
        
        
        
        
        //JSON.parse(localStorage.getItem('key'));
        //localStorage.setItem('key', value) anything thats not a string you have to use JSON.stringify(value)
        // var testStart = confirm("The following is a timed quiz of your Javascript knowledge.  Each correct answer will lead you to the next question.  Each incorect answer will deduct time and give you another chance to answer the question.");
        // if (testStart === false){
            //     alert("Come back whenever you're ready.");
            //     System.exit(0); 
//     }
// alert("Great. Lets get started.");
        