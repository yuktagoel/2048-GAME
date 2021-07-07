document.addEventListener('DOMContentLoaded',()=>{
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay = document.querySelector('#result')
    const width=4;
    const box=[]
    let score=0


    function createBoard(){
        for (let i=0;i< width*width; i++) {
            square=document.createElement('div')
             square.innerHTML=0
            gridDisplay.appendChild(square)
            box.push(square)
        }
        create()
        create()
        colour()


    }
createBoard()

//to randomly create a number
function create(){
    let randomNumber=Math.floor(Math.random() * box.length )
    if (box[randomNumber].innerHTML == 0){
        box[randomNumber].innerHTML = 2



        gameOver()
    }
    else create()
}

//to swipe right

function moveRight(){
    for (let i=0;i<width*width;i++){
        if (i%4 ===0){
                let totalOne = box[i].innerHTML
                let totalTwo = box[i+1].innerHTML
                let totalThree = box[i+2].innerHTML
                let totalFour = box[i+3].innerHTML
                let row=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]


                let filteredRow = row.filter(num=>num)
                let missing = 4-filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                box[i].innerHTML= newRow[0]
                box[i+1].innerHTML= newRow[1]
                box[i+2].innerHTML= newRow[2]
                box[i+3].innerHTML= newRow[3]
        }
    }
}

//to swipe left

function moveLeft(){
    for (let i=0;i<width*width;i++){
        if (i%4 ===0){
                let totalOne = box[i].innerHTML
                let totalTwo = box[i+1].innerHTML
                let totalThree = box[i+2].innerHTML
                let totalFour = box[i+3].innerHTML
                let row=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]


                let filteredRow = row.filter(num=>num)
                let missing = 4-filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)

                box[i].innerHTML= newRow[0]
                box[i+1].innerHTML= newRow[1]
                box[i+2].innerHTML= newRow[2]
                box[i+3].innerHTML= newRow[3]
        }
    }
}

    //to swipe down
    function moveDown(){
        for(let i=0;i<4;i++){
                let totalOne = box[i].innerHTML
                let totalTwo = box[i+width].innerHTML
                let totalThree = box[i+(width*2)].innerHTML
                let totalFour = box[i+(width*3)].innerHTML
                let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

                let filteredColumn= column.filter(num=>num)
                let missing= 4-filteredColumn.length
                let zeros = Array(missing).fill(0)
                let newColumn= zeros.concat(filteredColumn)

                box[i].innerHTML= newColumn[0]
                box[i+width].innerHTML= newColumn[1]
                box[i+width*2].innerHTML= newColumn[2]
                box[i+width*3].innerHTML= newColumn[3]
        }
    }


    //to swipe up
    function moveUp(){
        for(let i=0;i<4;i++){
                let totalOne = box[i].innerHTML
                let totalTwo = box[i+4].innerHTML
                let totalThree = box[i+8].innerHTML
                let totalFour = box[i+12].innerHTML
                let column=[parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

                let filteredColumn= column.filter(num=>num)
                let missing= 4-filteredColumn.length
                let zeros = Array(missing).fill(0)
                let newColumn= filteredColumn.concat(zeros)

                box[i].innerHTML= newColumn[0]
                box[i+4].innerHTML= newColumn[1]
                box[i+8].innerHTML= newColumn[2]
                box[i+12].innerHTML= newColumn[3]
        }
    }

    function combineRow(){
        for(let i=0;i<15;i++) {
            if(box[i].innerHTML===box[i+1].innerHTML){
                let combineTotal = parseInt(box[i].innerHTML)  + parseInt( box[i+1].innerHTML)
                box[i].innerHTML=combineTotal
                box[i+1].innerHTML=0
                score+=combineTotal
                scoreDisplay.innerHTML=score
            }
        }
        checkWin()
colour()

    }

    function combineColumn(){
        for(let i=0;i<12;i++) {
            if(box[i].innerHTML===box[i+width].innerHTML){
                let combineTotal = parseInt(box[i].innerHTML)  + parseInt( box[i+width].innerHTML)
                box[i].innerHTML=combineTotal
                box[i+width].innerHTML=0
                score+=combineTotal
                scoreDisplay.innerHTML=score
            }
        }
        checkWin()
colour()

    }

//to use keyboard
function control(e){
   if(e.keyCode=== 39){
       keyRight()
   }
   else if(e.keyCode ===37){
       keyLeft()
   }
   else if(e.keyCode === 40){
       keyDown()
   }
   else if(e.keyCode === 38){
        keyUp()
    }
}

document.addEventListener('keyup',control)

function keyRight(){
    moveRight()
    combineRow()
    moveRight()
    create()
    colour()
}

function keyLeft(){
    moveLeft()
    combineRow()
    moveLeft()
    create()
    colour()

}


function keyDown(){
    moveDown()
    combineColumn()
    moveDown()
    create()
    colour()

}


function keyUp(){
    moveUp()
    combineColumn()
    moveUp()
    create()
    colour()

}

function checkWin(){
    for (let i=0;i<box.length;i++) {
        if(box[i].innerHTML==2048){
            resultDisplay.innerHTML='You Win'
            document.removeEventListener('keyup',control)

        }
        }
    }

    function gameOver(){
        let zeros=0
        let c=0
        for (let i=0;i<box.length;i++){
            if(box[i].innerHTML==0){
                zeros++
            }
        
        }
        for(let i=0;i<15;i++) {
            if( box[i].innerHTML===box[i+1].innerHTML){
                c++
            }
             
         }
         for(let i=0;i<12;i++) {
             if(box[i].innerHTML===box[i+width].innerHTML){
                 c++
             }
         }

        if(zeros===0 && c===0)
        { 
            resultDisplay.innerHTML='You Loose'
            document.removeEventListener('keyup',control)
            
        }
    }

   
function colour(){
    for (let i=0;i<box.length;i++) {

    if(box[i].innerHTML==2){
        box[i].style.backgroundColor='#cd853f'
    }
    else if(box[i].innerHTML==4){
        box[i].style.backgroundColor='#c19a6b'
    }
    else if(box[i].innerHTML==8){
        box[i].style.backgroundColor='#FFBE7C'
}
else if(box[i].innerHTML==16){
    box[i].style.backgroundColor='#DEB887'
}
else if(box[i].innerHTML==32){
    box[i].style.backgroundColor='#F4A460'
}
else if(box[i].innerHTML==64){
    box[i].style.backgroundColor='#79443B'

}
else if(box[i].innerHTML==128){
    box[i].style.backgroundColor='#D2691E'
}
else if(box[i].innerHTML==256){
    box[i].style.backgroundColor='#A0522D'
}
else if(box[i].innerHTML==512){
    box[i].style.backgroundColor='#A52A2A'
}
else if(box[i].innerHTML==1024){
    box[i].style.backgroundColor='#800000'
}
else if(box[i].innerHTML==2048){
    box[i].style.backgroundColor='#B22222'
}
else{
    box[i].style.backgroundColor='#FFF8DC'
}
}
}

})
