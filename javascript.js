let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//TO CHANGE SCREEN MODE DARK OR LIGHT
let body=document.querySelector("body");
let mode=document.querySelector(".mode-btn");
let scroll=document.querySelector(".scroll-btn");
let gameBox=document.querySelector(".game");
let currMode="light";
mode.addEventListener("click",()=>{
  if(currMode==="light"){
    currMode="dark";
    scroll.classList.add("neon");
    gameBox.classList.add("neon");
    body.classList.add("dark");
    body.classList.remove("light");
    mode.classList.add("neon");
    newGameBtn.classList.add("neon");
    resetBtn.classList.add("neon");
    
  }else{
    currMode="light";
    body.classList.add("light");
    body.classList.remove("dark");
    gameBox.classList.remove("neon");
    scroll.classList.remove("neon");
    mode.classList.remove("neon");
    newGameBtn.classList.remove("neon");
    resetBtn.classList.remove("neon");
  }
});

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is Player ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);