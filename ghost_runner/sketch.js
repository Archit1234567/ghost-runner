var tower,towerImg;
var door,doorImg;
var doorsGroup,climbersGroup;
var climber,climberImg;
var ghost,ghostImg;
var invisBlock,invisBlockGroup ;
var gameState = "PLAY";
var soundtrack;

function preload() {
towerImg = loadImage ("tower.png");
soundtrack = loadSound ("spooky.wav");
doorImg = loadImage ("door.png");
climberImg = loadImage ("climber.png");
ghostImg = loadImage ("ghost-standing.png");
}


function setup() {
createCanvas (600,600);
 
tower = createSprite (300,300,50,50);
tower.addImage ("tim",towerImg);
tower.velocityY = 1;

ghost = createSprite (300,300,50,50);
ghost.addImage ("gim",ghostImg);
ghost.scale = 0.5;

doorsGroup = new Group;
climbersGroup = new Group;
invisBlockGroup = new Group;
}


function draw() {
background ("black");

if (tower.y>400){
 tower.y =300;
}
if (gameState==="PLAY"){

ghost.velocityY = ghost.velocityY + 0.5;


if (keyDown("Left_arrow")){
    ghost.x = ghost.x-5;
}

if (keyDown("Right_arrow")){
    ghost.x = ghost.x+5;
}


if (keyDown ("space")){
    ghost.velocityY = -10;
}
if (climbersGroup.isTouching(ghost)){
    ghost.velocityY=0
    
}

if (invisBlockGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
    gameState = "END";
    
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    invisBlockGroup.destroyEach();
}
spawnDoors()
}
drawSprites ();
if (gameState === "END"){
    fill ("red");
    textSize (30);
    text ("GAME OVER",200,300);
}


}

function spawnDoors() {
if (frameCount%240===0){
  door = createSprite (200,-55,10,10);
  climber = createSprite (200,10,10,10);
  invisBlock = createSprite (200,8,100,1);
  invisBlock.visible = false;
   
  door.x = Math.round (random(100,400));
  climber.x = door.x;
  invisBlock.x = door.x;

  door.velocityY = 1;
  climber.velocityY = 1;
  invisBlock.velocityY = 1;

  door.lifetime = 800;
  climber.lifetime = 800;
  invisBlock.lifetime = 800;        

  door.addImage ("dim",doorImg);
  climber.addImage ("cim",climberImg);
  
  doorsGroup.add (door);
  climbersGroup.add (climber);
  invisBlockGroup.add (invisBlock);
  
  ghost.depth = door.depth;
  ghost.depth = ghost.depth + 1;

  ghost.depth = climber.depth;
  ghost.depth = ghost.depth + 1;

  
}
}

