buttonColours = ["red","blue","green","yellow"]
gamePattern = [];
userClickedPattern =[];
presskeyboard = false;
level = 0;

function nextSequence(){
    level++;
    userClickedPattern=[];
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChosenColour);
    
    $("#level-title").text("Level " + level);
    
}

function playSound(name){
    var audio = new Audio('../sounds/'+name+'.mp3');
    audio.play();   
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

$(".btn").click(function(){
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


$(document).keypress(function(){
    if (!presskeyboard){
        presskeyboard = true;
        $("#level-title").text("Level "+level);
        nextSequence();

    }
});


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success")
        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
            
        }
    }else{
        console.log("wrong")
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();  
    }
    
}

function startOver(){
    level = 0;
    gamePattern=[];
    presskeyboard = false;
}