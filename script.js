const display = document.querySelector(".display");
function whoWin() {
    const allSquaresC = document.querySelectorAll('.grid'); // just all the grids like last time
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]
    /* So what is this doing? this is searching through each array in the winningCombos array 
        then it searches each ''cell'' this is just like another for each loop, ''cell'' can be anything 
        it could be "poop", "item" or anything it just makes more sense to call it cell because what its
        referering to is the indecie in each array inside the winning combo for instance 1 then 4 then 7
        so this works very similarly to a double for loop it searches through each array wich searches for 
        each cell before it moves on to the next array, so then it checks if its first child (the <p> we assigned earlier)
        and if the class contains an o or in later code if it includes an x by doing this you can check  if each has 
        its respective symbol in any order!!! for example lets say you get the 3 in a row 0, 1, 2 that is a winning combo
        and each of those contain an o but what if it was 3 then 1 then 2 because they werent placed in ''order''
        by the player meaning he clicked them out of order since its not assinging different numbers each time like previous code
        it doesnt matter so if the 0 the 1 or the 2 contain the o class or x class that must mean we have 3 in a row
        so therefore the o wins!!! If that doesnt make sense let me reiterate essintially we have a array and the divs or squares
        are assigned a "number" to see this you can console.log the allsqauresC you'll see that it appears as a node list so
        what  this does is it looks through each of the numbers for example 0 which is hte first square and check if it has an o class or x class
        and it keeps cheking if each cell has the o class so it will check the winningCombos array 0, and check square 0
        does it have an o? it does!!! (for the sake of this ex it does). okay what about cell 1, it checks square 1 and it does!
        so lastlty it checks square 2 and if it also has a o it evals to true since its ''asking'' if each of hte cells in
        the array have the class and if it does then true and then if true then o wins!!! thats it so simple
         */

        //console.log(allSquaresC); <-- testing

    winningCombos.forEach(arrays => {
        const oWins = arrays.every(cell => 
            allSquaresC[cell].firstChild?.classList.contains("o"))
            // if oWins is true then well... o wins
            if (oWins) {
                display.textContent = "O WINS!";
                return 
            } 
    })

    winningCombos.forEach(arrays => {
        const xWins = arrays.every(cell => 
            allSquaresC[cell].firstChild?.classList.contains("x"))

            if (xWins) {
                display.textContent = "X WINS!";
                return 
            } 
    })
   
   
}

// a module 
const gameFlow = (() => {
    let xTurn;
    let oTurn;

    const init = () => {
        xTurn = true;
        oTurn = false; // initializes the turns, x will always go first 
    }
    // Changes the turn
    const changeTurn = () => {
        if (xTurn === true && oTurn == false){
            xTurn = false;
            oTurn = true;
         } else if (xTurn === false && oTurn == true) {
             xTurn = true;
             oTurn = false;
         }
    }
    // whos turn is it? this retrieves it, getter
    const getState = () => {
        if (xTurn === true && oTurn == false){
           return "x";
        } else if (xTurn === false && oTurn == true) {
            return "o";
        }
    }
    // You have to do this to return the values module syntax
    return {
        init,
        changeTurn,
        getState
      };
})();

gameFlow.init();

const allSquares = document.querySelectorAll('.grid')
allSquares.forEach(grid => {
    grid.addEventListener('click', (e) => {
        const selectedGrid = e.target; // the selected target is the selected grid
        // makes it so I cant edit the square if it already has something in it
        if (selectedGrid.textContent != "") {
            return;
           };
        const symbolInside = document.createElement('p'); // creates a p element to store the x or the o
        selectedGrid.appendChild(symbolInside); 
       symbolInside.textContent = gameFlow.getState() // this is what checks will be the x or the o 
       symbolInside.classList.add(gameFlow.getState()); // does the same thing as above but adds a class to make it clear
       gameFlow.changeTurn(); // calls teh change turn which just changes the turn
       whoWin();// calls the earlier fucntion so we are checking who wins each click
    })
})

