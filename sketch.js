var dog,happydog,database,foodS,foodStock

function preload()
{
  dogImg = loadImage("image/dogImg.png")
  happydogImg = loadImage("image/happydogImg.png")
}

function setup() {
	createCanvas(500,500);

  database = firebase.database();
  dog = createSprite(250,350,10,60)
  dog.addImage(dogImg)
  dog.scale = 0.2;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20)
  
}


function draw() {  
background("green");
if(foodS!== undefined){
  textSize(15)
  fill(255)
  text("NOTE:PRESS UP_ARROW KEY TO FEED DRAGO MILK!",50,50)
  text("Food Remaining"+foodS,50,70)

if (keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happydogImg);
}

if (keyWentUp(UP_ARROW)){
  dog.addImage(dogImg);
}

if(foodS === 0){
  foodS = 20;
}

drawSprites();
}
}

//function to read values from DB
function readStock(data){
  foodS=data.val();
}

//function to write values in DB
function writeStock(x){
if(x<=0){
  x=0;
}else{
  x=x-1;
}
 database.ref('/').update({
   food:x
 })

}