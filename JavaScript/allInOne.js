// Constant for Log Style
const LOG = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    // Foreground (text) colors
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m"
    },
    // Background colors
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
};

/**
 * fillAvailableRows
 * Complexity: O(n)
 * @param {integer} boardSize 
 * @returns {Array}
 */
function fillAvailableRows(boardSize){
    let availableRows = new Array();
    for(let index = 0; index<boardSize; index++){
        availableRows.push(index);
    }
    return availableRows
}

/**
 * Validation
 * Prints the board with the queens as 1, and 0 for an empty space
 * Complexity O(n^2)
 * @param {Set} queens 
 * @returns {void}
 */
function printSolution(queens){
    console.log(`${LOG.fg.magenta}---- This is your solution ----${LOG.reset}`);
    const alphabetASCII = Array.from(Array(queens.size)).map((e, i) => i + 65);
    const alphabet = alphabetASCII.map((x) => ` ${String.fromCharCode(x)}`);
    let isColored = true;
    console.log(`  `, ...alphabet);

    for(let i=0; i<queens.size; i++){
        let iterator = queens.values();
        let row = new Array();
        queens.size % 2 == 0 ? isColored = !isColored : {}
        for(let j = 0; j<queens.size; j++){
            isColored = !isColored
            iterator.next().value == i ? 
                row.push(`${LOG.bg.red}${isColored ? LOG.fg.black : LOG.fg.white} 1`) 
                : row.push(`${isColored? LOG.bg.white : LOG.bg.black}${isColored? LOG.fg.black : LOG.fg.white} 0`)
        }
        console.log(`${(i+1).toString().padStart(2, 0)}`, ...row, `${LOG.reset}`);
    }
}

const validate = (state, row, column, boardSize) => {
    return  ( !state.queens.has(state.availableRows[row]) &&
            !state.positiveDiagonal.has((boardSize-1) - state.availableRows[row] - column) &&
            !state.negativeDiagonal.has(column - state.availableRows[row]) )
}

/**
 * 
 * @param {Object} state 
 * @param {integer} column 
 * @param {integer} boardSize 
 * @returns 
 */
function PlacingQueens( state, column, boardSize ){
    let laps = 0;
    let row = Math.floor(Math.random() * (state.availableRows.length - 0));

    for(row; row < state.availableRows.length; row++){

        if( validate(state, row, column, boardSize) ){

            state.queens.add(state.availableRows[row]);
            state.positiveDiagonal.add((boardSize-1)-state.availableRows[row]-column);
            state.negativeDiagonal.add(column-state.availableRows[row]);
            let [value] = state.availableRows.splice(row,1);

            if(state.queens.size == boardSize) return [true, state.queens]

            var [status, returnedQueens] = PlacingQueens(state, column+1, boardSize)

            if(status) return [status, returnedQueens]

            state.availableRows.splice(row,0, value)
            state.queens.delete(state.availableRows[row]);
            state.positiveDiagonal.delete((boardSize-1)-state.availableRows[row]-column);
            state.negativeDiagonal.delete(column-state.availableRows[row]);
        }

        if(row + 1 == state.availableRows.length && laps < 1) row = -1, laps += 1;
    }

    return [false, state.queens]
}

/**
 * Queens
 * Starting Function, used for creating variables for the placing queens function
 * @param {int} boardSize 
 * @returns 
 */
function Queens(boardSize){

    if(boardSize<4 && boardSize != 1) return `Not posible! ${boardSize} < 4 and it's different of 1`

    let availableRows = fillAvailableRows(boardSize);
    let column = 0
    var negativeDiagonal = new Set(); // [ -|n-1|, n-1 ]
    var positiveDiagonal = new Set(); // [ -|n-1|, n-1 ]
    var queens = new Set(); // Max length = n

    const state = {
        availableRows,
        negativeDiagonal,
        positiveDiagonal,
        queens
    }

    let [status, returnedQueens] = PlacingQueens(state, column, boardSize)

    return !status ? 'It was not posible' : returnedQueens;
}

var myArgs = process.argv.slice(2);

function main(myArgs){
    myArgs.map( e => {

        console.log(`\n${LOG.fg.cyan}****************N-Queens****************${LOG.reset}`);
        console.log(`Size of Board: ${LOG.fg.white}${e}${LOG.reset}`);

        const startTime = Date.now();
        let queens = Queens(e)
        const elapsedSeconds = (Date.now() - startTime)/1000;

        if(typeof queens !== 'string'){
            console.log(`Seconds Elapsed: ${LOG.fg.green}${elapsedSeconds}${LOG.reset}`);
            
            printSolution(queens);
            
            console.log(`\nQueens positions by column (0-${e-1}):`);
            console.log(queens); 
        }

        typeof queens === 'string' ? console.log(LOG.fg.red, queens, LOG.reset) : {}
    })
}
