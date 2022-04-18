// Constant for Log Style
const Log = {
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
 * Validation
 * Prints the board with the queens as 1, and 0 for an empty space
 * Complexity O(n^2)
 * @param {Set} queens 
 * @returns {void}
 */
function Validation(queens){
    console.log("\x1b[35m---- This is your solution ----\x1b[0m");
    const alpha = Array.from(Array(queens.size)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    alphabet.unshift("  ")
    console.log(...alphabet);
    
    for(let i=0; i<queens.size; i++){
        let iterator = queens.values();
        let row = new Array();
        for(let j = 0; j<queens.size; j++){
            if(iterator.next().value == i){
                row.push(`${Log.fg.green}1${Log.reset}`)
            }else{
                row.push(`${Log.fg.yellow}0${Log.reset}`)
            }
        }
        console.log(`${(i+1).toString().padStart(2, 0)}`, ...row);
    }
}

/**
 * PlacingQueens
 * Function to place and validate each queen 
 * @param {Set} q 
 * @param {int} c 
 * @param {Set} Dpos 
 * @param {Set} Dneg 
 * @param {int} n 
 * @param {Array} Disp 
 * @returns {[boolean, Set]} 
 */
function PlacingQueens(q, c, Dpos, Dneg, n, Disp){
    let count = 0
    let r = Math.floor(Math.random() * (Disp.length - 0));
    // console.log(`Random value: ${r}`);
    for(r; r<Disp.length; r++){
        // console.log(`I'm in the ${c} column`);
        if(!q.has(Disp[r]) && !Dpos.has((n-1)-Disp[r]-c) && !Dneg.has(c-Disp[r])){
            q.add(Disp[r]);
            Dpos.add((n-1)-Disp[r]-c);
            Dneg.add(c-Disp[r]);
            let [value] = Disp.splice(r,1);

            if(q.size == n){
                return [true, q]
            }else{
                var [status, queens] = PlacingQueens(q, c+1, Dpos, Dneg, n, Disp)
                //console.log(status);
            }
            
            if(status){
                return [status, queens]
            }else{
                Disp.splice(r,0, value)
                q.delete(Disp[r]);
                Dpos.delete((n-1)-Disp[r]-c);
                Dneg.delete(c-Disp[r]);
            }
        }
        if(r+1 == Disp.length && count<1){
            r = 0;
            count+=1;
        }
        //console.log(`Disponibles`);
        //console.log(Disp);
    }
    return [false, q]
}

/**
 * Queens
 * Starting Function, used for creating variables for the placing queens function
 * @param {int} n 
 * @returns 
 */
function Queens(n){
    // console.log("Hello World");
    
    if(n<4 && n != 1){
        return `Not posible! ${n} < 4 and it's different of 1`
    }
    // Queens -> Row
    var q = new Set(); // Max length = n
    
    // Positive and Negative Diagonal
    var Dpos = new Set(); // [ -|n-1|, n-1 ]
    var Dneg = new Set(); // [ -|n-1|, n-1 ]
    
    // Rows available
    let Disp = [];
    for(let i = 0; i<n; i++){
        Disp.push(i);
    }
    
    // Initial Column
    let c = 0

    let [status, queens] = PlacingQueens(q, c, Dpos, Dneg, n, Disp)

    if(!status){
        return "It was not posible"
    }else{
        return queens
    }
}

// Reading an Input
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

var n

rl.question("Size of Board: ", function (answer) {
    n = parseInt(answer)
});

// Waiting 5 seconds for the input to start
setTimeout(() => {
    const start = Date.now();
    let q = Queens(n)
    const miliseconds = Date.now() - start;
    if(typeof q !== 'string'){
        console.log("\x1b[36m****************N-Queens****************\x1b[0m");
        console.log(`Seconds Elapsed: \x1b[32m${miliseconds /1000}\x1b[0m`);
        Validation(q);
        console.log(" ")
        console.log("Queens positions by column:");    
        console.log(q); 
    }else{
        console.log(Log.fg.red, q);
    }
}, 5000)

