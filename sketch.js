var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 600);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading = createElement("h1")
  scoreBoard = createElement("h1")
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  scoreBoard.html("Score:" + score)
  scoreBoard.position(200,20)
  scoreBoard.style("color:red")

  heading.html("Life:" + life)
  heading.position(600,20)
  heading.style("color:red")

  if(gameState===1){
    gun.y=mouseY  

  if(keyDown("space")){
    shootBullet();
  }

  if(frameCount % 100 === 0){
    drawredBubble()
  }

  if(frameCount % 80 === 0){
    drawblueBubble()
  }

  if(blueBubbleGroup.collide(bulletGroup)){
handleBubbleCollision(blueBubbleGroup)
  }

  if(redBubbleGroup.collide(bulletGroup)){
    handleBubbleCollision(redBubbleGroup)
      }

  if(blueBubbleGroup.collide(backBoard)){
    handleGameOver(blueBubbleGroup)
  }
  
  if(redBubbleGroup.collide(backBoard)){
    handleGameOver(redBubbleGroup)
  }


    drawSprites();
  }
     
}
function shootBullet(){
  bullet = createSprite(100,gun.y,50,50)
  bullet.addImage("dart", bulletImg)
  bullet.scale = 0.11
  bullet.setVelocity(6,0)
  bulletGroup.add(bullet)
  bullet.lifetime = 150

}


function drawblueBubble(){
  bluebubble = createSprite(800, random(10,590), 50,50)
  bluebubble.addImage("pop", blueBubbleImg)
  bluebubble.scale = 0.07
  bluebubble.setVelocity(-6,0)
  blueBubbleGroup.add(bluebubble)
  bluebubble.lifetime = 150
}


function drawredBubble(){
  redbubble = createSprite(800, random(10,590), 50,50)
  redbubble.addImage("plop", redBubbleImg)
  redbubble.scale = 0.07
  redbubble.setVelocity(-6,0)
  redBubbleGroup.add(redbubble)
  redbubble.lifetime = 150
}


function handleBubbleCollision(bubbleGroup){
if(life > 0){
  score = score + 1
}
blast = createSprite(bullet.x,bullet.y)
blast.addImage("explosion", blastImg)
blast.scale = 0.2
blast.lifetime = 20
bulletGroup.destroyEach()
bubbleGroup.destroyEach()
}


function handleGameOver(bubbleGroup){
life = life -1
bubbleGroup.destroyEach()
if(life === 0){
  gameState = 2
  swal({
    title: `GAME OVER!`,
    text: 'OH NO! YOU LOST THE GAME',
    text: "Your Score is: "+ score,
    text: ":)",
    confirmButtonText: "Thanks For Playing"

  })
}
}