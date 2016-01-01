//***************** Catch the goblin Game ***********************
//Author - Satabdi Ganguly
//Version - 0.1
//Date - 1.01.2016
//****************************************************************

var canvas=document.createElement("canvas");
var ctx=canvas.getContext("2d");
canvas.width =512;
canvas.height = 480;
document.body.appendChild(canvas);

//Background Image

var bgReady= false;
var bgImage = new Image();

bgImage.onload= function(){
    bgReady=true;

};

bgImage.src="images/background.png";

//Hero
var hrReady= false;
var hrImage = new Image();

hrImage.onload= function(){
    hrReady=true;

};

hrImage.src="images/hero.png";

//Goblin
var gbReady= false;
var gbImage = new Image();

gbImage.onload= function(){
    gbReady=true;

};

gbImage.src="images/monster.png";

//Game Objects

var hero={
    speed: 256,

};


var monster ={};

var monsterscaught = 0;


//Input Handler
var keysDown={};

addEventListener("keydown", function(e)
{

    keysDown[e.keyCode] = true;

}, false);

addEventListener("keyup", function(e)
{

    delete keysDown[e.keyCode];

}, false);

var reset=function(){
    hero.x =canvas.width/2;
    hero.y=canvas.height/2;
    //Position the monster randomly somewhere
    monster.x=32+(Math.random()* canvas.width - 64);
    monster.y=32+(Math.random()*canvas.height - 64);
};


var update=function(modifier){
    if(38 in keysDown){
        //Player holding up
        hero.y -=hero.speed * modifier;

    }
    //player holding down
    if(40 in keysDown)
    {

        hero.y+=hero.speed * modifier;

    }
    //Player is holding left
    if(37 in keysDown)
    {
        hero.x -=hero.speed * modifier;


    }

    //Player holding right
    if(39 in keysDown)
    {

        hero.x += hero.speed * modifier;

    }

    //Collision
    if(
        hero.x <= (monster.x +32)
        && monster.x <= (hero.x + 32 )
        && hero.y <= (monster.y + 32)
        && monster.y <=(hero.y + 32)

    )
    {
        ++monsterscaught;
        reset();



    }

};

//Draw everything

var render= function(){
    if(bgReady)
    {
        ctx.drawImage(bgImage, 0, 0);
    }

    if(hrReady)
    {
        ctx.drawImage(hrImage, hero.x, hero.y);

    }
    if(gbReady)
    {
       ctx.drawImage(gbImage, monster.x, monster.y);
    }

    //score
    ctx.fillStyle="rgb(250, 250, 250)";
    ctx.font="24px arial";
    ctx.textAlign= "left";
    ctx.textBaseline="top";
    ctx.fillText("Monsters Caught: "+monsterscaught, 32, 32);

};

//Main game loop

var main = function(){
    var now=Date.now();
    var delta=now - then;

    update(delta/ 1000);
    render();
    then = now;
    requestAnimationFrame(main);


};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//Play the game
var then = Date.now();
reset();
main();
