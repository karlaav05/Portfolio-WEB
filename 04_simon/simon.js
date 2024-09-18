// Global Variables
var colors = ["red", "blue", "green", "yellow"];
var cpu = []; 
var player = [];
var level = 0;
var index = 0;
var gameStarted = false;

// CPU Methods
function nextSequence(){
    $("#level-title").text("Level " + level);
    player = [];

    let random = Math.floor(Math.random()*4);
    let color = colors[random];
    cpu.push(color);
    playSound("sounds/" + color);

    $("#" + color).fadeOut();
    $("#" + color).fadeIn();

    console.log("CPU:" + cpu);
}

function resetGame(){
    playSound("sounds/wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    
    cpu = [];
    player = [];
    level = 0;
    gameStarted = false;
    $("#level-title").text("Game over, Press Any Key to Restart");
}

// debe aumentar nivel cada que secuencia insertada haga match con secuencia del juego
function checkAnswer(index){
    if(cpu[index] == player[index]){
        console.log("success");
        if(index == level){
            level++;
            setTimeout(nextSequence(), 1000)
            index = -1;
        }
    }else{
        console.log("wrong");
        resetGame();
        index = -1;
    }
    return index;
}

// Player Methods
function animatePress(color){
    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    }, 100);
}

// Utilities
function playSound(sound){
    let audio = new Audio(sound + '.mp3');
    audio.play();
}

// Event Listeners
$(document).ready(function(){
    $(".btn").click(function(){
        if(gameStarted){
            let currentId = $(this).attr('id');
            player.push(currentId);

            playSound("sounds/" + currentId);
            animatePress(currentId);
            index = checkAnswer(index) + 1;

            console.log("Player: " + player);
        }
    });

    //keyboard listener
    $(document).keypress(function(){
        if(!gameStarted){
            nextSequence();
            gameStarted = true;
        }
    });
});