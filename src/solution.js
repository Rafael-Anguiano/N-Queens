const LOG = require('./logsFormat.js')

/**
 * Print Solution
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

module.exports = printSolution