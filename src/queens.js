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

module.exports = Queens