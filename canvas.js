let canvas  = document.querySelector('.canvas');
let ctx     = canvas.getContext('2d') 
let w       = canvas.width  = innerWidth;
let h       = canvas.height = innerHeight;
let arrImg  = []
let copyArrImg = []

const SQRT_PIECES_IMG = 20
let bgImage = new Image();
bgImage.src = 'siluet_chelovek_anonim.jpg'

function pushArrImg(){
	for(let i = 0;i <= h;i += SQRT_PIECES_IMG+1){
		for(let j = 0;j <= w;j += SQRT_PIECES_IMG+1){
      arrImg.push({dx:j,dy:i,sx:j,sy:i,wImg:SQRT_PIECES_IMG,hImg:SQRT_PIECES_IMG}) // Объект координат и размеров
      copyArrImg.push({dx:j,dy:i,sx:j,sy:i,wImg:SQRT_PIECES_IMG,hImg:SQRT_PIECES_IMG}) // Объект координат и размеров
		}
	}
}
    
function createImage(){
	for(let i = 0;i < copyArrImg.length;i++){
		ctx.drawImage(bgImage,
			copyArrImg[i].dx,
		  copyArrImg[i].dy,
		  SQRT_PIECES_IMG,
		  SQRT_PIECES_IMG,
		  copyArrImg[i].sx,										
		  copyArrImg[i].sy,
		  copyArrImg[i].wImg,
		  copyArrImg[i].hImg)
	}
}
// ctx.imageSmoothingEnabled = true
// ctx.imageSmoothingQuality = "low"

let gravity = false

function gravityDown(){
	let ss = 0
	if(gravity){
		copyArrImg.forEach(function(e){
		  e.sy += 0.01*ss++
	  })
	}
}
canvas.addEventListener('click',()=>{
	gravity = true
})
function parallax(){
	canvas.addEventListener('mousemove',function(event){
	  let distance = 0
	  let center = SQRT_PIECES_IMG/2
	  copyArrImg.forEach(function(el,index){
      distance = Math.sqrt(((el.sx+center - event.x)*(el.sx+center - event.x))+((el.sy+center - event.y)*(el.sy+center - event.y))) // Найди отличия)))по факту формула нахождения длины гепатинузы(ею является distence)
      if(distance < 120){
      	if(event.x < el.sx) el.sx+= 8
      	if(event.x > el.sx) el.sx-= 5
      	if(event.y < el.sy) el.sy+= 12
      	if(event.y > el.sy) el.sy-= 9
      		// el.wImg = 50
      		// el.hImg = 50
      		// ctx.rotate(45 * Math.PI / 180)
      }
      if(distance > 700){
      	el.sx = arrImg[index].sx
      	el.sy = arrImg[index].sy
      }
    })
  }) 

}
function loop(){
////////////////////
  ctx.clearRect(0,0,w,h)
	  createImage()
	  gravityDown()
	requestAnimationFrame(loop)
///////////////////
}
function initAllFunction(){
	pushArrImg()	
	loop()
	parallax()
}

initAllFunction()
