
let ball =  document.querySelector(".ball");
let board = document.querySelector(".board");

// paddle 

let leftpaddle = document.querySelector(".left");
let rightpaddle = document.querySelector(".right");

let boardcoordinates = board.getBoundingClientRect();



let boardTop = boardcoordinates.top;
let boardLeft = boardcoordinates.left;
let boardBottom = boardcoordinates.bottom;
let boardRight  = boardcoordinates.right; 


// player life

let leftplayerlife = 3;
let rightplayerlife = 3;
// paddle coordinates

// let leftpaddlecoor = leftpaddle.getBoundingClientRect();
// let rightpaddlecoor = rightpaddle.getBoundingClientRect();

// let lefttop = leftpaddlecoor.top;
// let righttop = rightpaddlecoor.top;


//x and y
let x = true;
let y = true;

document.addEventListener("keydown" , function(e){
    //alert("koi to key hae");
    if(e.key == "w"){

        
        // left walo

        movepaddle(leftpaddle , -window.innerHeight *0.1) // window object a
         //leftpaddle.style.top = lefttop - 2 + "px";
        ///alert(e.key);
        // window.innerHtlp gives heigth and wight of tab 

    }
    else if(e.key == "s"){
        // left
       // leftpaddle.style.top = lefttop + 2 + "px";
        movepaddle(leftpaddle , window.innerHeight *0.1)
    }
    else if(e.key == "ArrowUp"){
       // right.style.top = righttop + 2 + "px";

        movepaddle(rightpaddle , -window.innerHeight *0.1)
        
    }
     else if(e.key == "ArrowDown"){
       // right.style.top = righttop + 2 + "px";
        movepaddle(rightpaddle , window.innerHeight *0.1)
        
    }
})

// *********************color set**************************
function setColor(idx){
    let allcircle = document.querySelectorAll(".fa.fa-circle");
    allcircle[idx].style.color = "red"; /// "" i was having problem with double quotes

}


function  movepaddle(cPaddle , change){
    let cPaddlecoo = cPaddle.getBoundingClientRect();


    // fixing bound problem (w) means uppar jayega if it is inside boundry 
    if(cPaddlecoo.top + change >= boardTop && cPaddlecoo.bottom + change <= boardBottom){
        cPaddle.style.top = cPaddlecoo.top  + change +"px";
    }
    // cPaddle.style.top = cPaddlecoo.top  + change +"px";

}


function moveball() {
    let ballcoordinates = ball.getBoundingClientRect();
    let ballTop = ballcoordinates.top;
    let ballLeft = ballcoordinates.left;
    let ballBottom = ballcoordinates.bottom;
    let ballRight  = ballcoordinates.right;;


    //check if collided on any side of wall
    //*****************scoring******************************** */


    let hastouchedleft = ballLeft < boardLeft; // left mae touch kiya
    let hastouchedright = ballRight > boardRight; // right mar touch kiya

    if(hastouchedleft || hastouchedright){

        // touched left side
        if(hastouchedleft){
            leftplayerlife -- ; // life decreased if life is 0  or 1 or 2
            // change color

            setColor(leftplayerlife);
            if(leftplayerlife == 0){
                alert("player b won");
               document.location.reload();

            }
            // reset life is 2
            else{
               // return resetgame();
               return resetgame();
        
            }

        }

        //touched right side
        else{
            rightplayerlife -- ;
            setColor(3+rightplayerlife);
            if(rightplayerlife == 0){
                alert ("player a won");
                document.location.reload();
            }
            // reset life becomes 2 from 3
            else{
               //return  resetgame();
               return resetgame();
            }

        }
    }
    function resetgame(){

        // ball center
        ball.style.top = window.innerHeight*0.45+"px";
        ball.style.left = window.innerWidth *0.45 + "px";
        // reset animation function
        requestAnimationFrame(moveball);
    }
 //********************************************************************** */

    
      

    //is ball in bound
//*************vertical collosion************************ */

    // handle vertical bound  ballTop >= boardTop !! ballBottom <= boardBottom
    if(ballTop <= boardTop || ballBottom >= boardBottom){
        y=!y ; 

    }

    // HANDLE horizontal bound ,,  ballleft >= boardleft || ballright <= boardright
    
    // y mae same condition wall sae collide to return but x mae agar paddle sae collide to return
 //********************************************************************** */


 ///******************************* horizontal collosion********************* */
    let leftpaddlebounds = leftpaddle.getBoundingClientRect();
    let rightpaddlebounds = rightpaddle.getBoundingClientRect();

    if(ballLeft <= leftpaddlebounds.right   && ballRight >= leftpaddlebounds.left && ballTop +30  >= leftpaddlebounds.top && ballBottom -30 <= leftpaddlebounds.bottom){
        x =!x;
    }
    if(ballLeft <= rightpaddlebounds.right && ballRight  >= rightpaddlebounds.left && ballTop+30 >= rightpaddlebounds.top && ballBottom-30 <= rightpaddlebounds.bottom){
        x= !x ;
    }
 //********************************************************************** */


    // inside bound so +4 else -4  top and bottom wall

// ********************************ball movement**************************


    ball.style.top = y==true? ballTop + 6 + "px": ballTop -6 + "px";

    // insede bound so right and left 
    ball.style.left = x==true? ballLeft + 6 + "px" :  ballLeft -6 + "px";

 //********************************************************************** */
    
    requestAnimationFrame(moveball);

}
requestAnimationFrame(moveball);