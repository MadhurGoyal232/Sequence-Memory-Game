let boxes = document.querySelectorAll(".boxes");
let body = document.querySelector("body");
let seqCounter = 1;
let runFlag = true;
let enableBoxes = true;
let randomSeqArr = [];
let noOfClicks = 0;
// Add the click event listener to all boxes
body.addEventListener("click", () => {
  if (runFlag) {
    boxes.forEach((box) => {
      box.style.display = "block";
      // rand.classList.add("fade");
    });

    randomSeqArr.push(generateSeq());
    setTimeout(() => {
      boxes[randomSeqArr[0]].classList.add("fade");
    }, 500);
    setTimeout(() => {
      boxes[randomSeqArr[0]].classList.remove("fade");
    }, 1000);

    runFlag = false;
  }
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (enableBoxes) {
      box.classList.add("fade");

      setTimeout(() => {
        box.classList.remove("fade");
      }, 500);
      noOfClicks++;
      checkSequence(box);
      
    }
  });
});

function generateSeq() {
  return (rand = Math.floor(Math.random() * 9));
}

function glowSequence() {
  let i = 0;
  randomSeqArr = [];

  // disabling the boxes
  enableBoxes = false;
  //generating the sequence
  while (i < seqCounter) {
    randomSeqArr.push(generateSeq());

    i += 1;
  }

  // we will use I to stop the interval
  i = 0;
  // This is independent variable that will help the sequence to glow
  j = 0

  // running the gnereated sequences -----------
  let keepGlowing = setInterval(() => {
    boxes[randomSeqArr[j]].classList.add("fade");
    setTimeout(() => {
      boxes[randomSeqArr[j]].classList.remove("fade");
      j++;
    }, 500);
    i++;
    if (i === seqCounter) {
        enableBoxes = true;
        clearInterval(keepGlowing);
        //enabling the boxes
    }
  }, 1000);
  console.log(randomSeqArr)
  //---------------------------------------------
}

function checkSequence(box){


    console.log("clickedBox : " , box.getAttribute("value") , "Array at", noOfClicks - 1, ":" , randomSeqArr[noOfClicks -1] )

    if (box.getAttribute("value") == randomSeqArr[noOfClicks - 1]) {
        console.log(seqCounter)
        console.log(noOfClicks)
        if((noOfClicks)=== (seqCounter) ){


            noOfClicks = 0;
            seqCounter += 1;
            glowSequence();
        }

        //
      } else {
        boxes.forEach((box) => {    
          box.style.display = "none";
        });

        // This will blink the background
        body.classList.add("blink");
        setTimeout(() => {
          body.classList.remove("blink");
        }, 100);

        // this will reset the game
        setTimeout(() => {
          runFlag = true;
        }, 1000);
        noOfClicks = 0;
        seqCounter = 1;
        randomSeqArr = [];
      }


}