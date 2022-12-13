const LOG = require('./src/logsFormat.js')
const Queens = require('./src/queens.js')
const printSolution = require('./src/solution.js');

var myArgs = process.argv.slice(2);

myArgs.map( e => {

    console.log(`\n${LOG.fg.cyan}****************N-Queens****************${LOG.reset}`);
    console.log(`Size of Board: ${LOG.fg.white}${e}${LOG.reset}`);

    const startTime = Date.now();
    let queens = Queens(e)
    const elapsedSeconds = (Date.now() - startTime)/1000;

    if(typeof queens !== 'string'){
        console.log(`Seconds Elapsed: ${LOG.fg.green}${elapsedSeconds}${LOG.reset}`);

        let solution = printSolution(queens);

        // console.log("\nQueens positions by column:");    
        // console.log(queens); 
        // console.log(solution);
    }

    typeof queens === 'string' ? console.log(LOG.fg.red, queens, LOG.reset) : {}
})