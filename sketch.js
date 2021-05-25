var road,mainCyclist;
var player1,player2, player3;
var roadImg,mainRacerImg1,mainRacerImg2;
var obs1,obs2,obs3;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell, RestartImg;
var obsImg1,obsImg2,obsImg3;

var pinkCyclistG, yellowCyclistG,redCyclistG; 

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;
var MaxDistance = 0;
var gameOver, restart;

function preload(){
  roadImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  obsImg1 = loadImage("images/obstacle1.png")
  obsImg3 = loadImage("images/obstacle2.png")
  obsImg3 = loadImage("images/obstacle3.png")
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/game_over.png");
  RestartImg = loadImage("images/reset.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
road=createSprite(100,150);
road.addImage(roadImg);
road.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
restart = createSprite(650,200);
restart.addImage(RestartImg);
restart.scale = 0.3;
restart.visible = false;  

gameOver = createSprite(650,100);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.3;
gameOver.visible = false;  
  
pinkCyclistG = new Group();
yellowCyclistG = new Group();
redCyclistG = new Group();
obs1G = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance + "m",900,30);
  text("Maximum Distance covered: "+ MaxDistance + "m",840,60);
  
  if(gameState === PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   road.velocityX = -(8 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
   mainCyclist.setCollider("circle",0,0,400)
   
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(road.x < 0 ){
    road.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 100 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    }  else {
      redCyclists();
    }
  }
    
    var obstacleSpawn = Math.round(random(4,7))
    
    if(World.frameCount % 50 == 0){
      if(obstacleSpawn == 4) {
        
      }
    }
  
   if(pinkCyclistG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCyclistG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCyclistG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
    if(obs1G.isTouching(mainCyclist)){
      gameState = END;
    }
    
}else if (gameState === END) {
  
    gameOver.visible = true;
    restart.visible = true;
  
   //restart game instrution
   
   if(mousePressedOver(restart)){
       reset();
     }
  
    road.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCyclistG.setVelocityXEach(0);
    pinkCyclistG.setLifetimeEach(-1);
  
    yellowCyclistG.setVelocityXEach(0);
    yellowCyclistG.setLifetimeEach(-1);
  
    redCyclistG.setVelocityXEach(0);
    redCyclistG.setLifetimeEach(-1);
    
    obs1G.setVelocityXEach(0);
    obs1G.setLifetimeEach(-1);
    
    }
}

function pinkCyclists(){
        player1 =createSprite(1300,Math.round(random(30, 270)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime = 170;
        player1.setCollider("circle",0,0,900);
        pinkCyclistG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1300,Math.round(random(30, 270)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        player2.setCollider("circle",0,0,900);
        yellowCyclistG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1300,Math.round(random(30,270)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        player3.setCollider("circle",0,0,900);
        redCyclistG.add(player3);
}

function obstacle1(){
  
   obs1 = createSprite(1300,Math.round(random(30,270)));
   obs1.scale = 0.5;
   obs1.velocityX = -(6 + 2*distance/150);
   obs1G.add(obs1);
}

function obstacle2(){
  
   obs2 = createSprite(1300,Math.round(random(30,270)));
   obs2.scale = 0.5;
   obs2.velocityX = -(6 + 2*distance/150);
  
}
 
function obstacle3(){
  
   obs3 = createSprite(1300,Math.round(random(30,270)));
   obs3.scale = 0.5;
   obs3.velocityX = -(6 + 2*distance/150);

}

//create reset function here

function reset(){

  gameState = PLAY;
  mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
  score = 0;
  
  pinkCyclistG.destroyEach();
  yellowCyclistG.destroyEach();
  redCyclistG.destroyEach();
   
  mainCyclist.x = 70;
  mainCyclist.y = 150;
}




