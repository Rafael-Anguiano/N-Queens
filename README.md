# N-Queens

## Problem:
> * Place  N queens on said  N×N   chessboard so that **no two queens threaten each other**. 
> * The ***Queen*** can move in it's line or row, or diagonally, any number of squares

<img src="https://miro.medium.com/max/500/1*Zm2pbDR5CS2w2xeUbTBxQQ.png" alt="N-Queens Solution Example" width="300"/>
<img src="https://cdn.iflscience.com/images/69d231d7-9c20-5ed2-86b0-89c782078b22/content-1643203313-1q.jpg" alt="Queen Movement" width="300"/>

## Description
This is my solution for this problem/puzzle.
> This algorithm shows only one solution by time runned.
 - Made using Javascript.

## Solution Explanation 
For this solution we found very important the use of HashSet objets to reduce the complexity and simplify the validation of rows and diagonals. 
> This is posible due to the `HashSet.has()` method which it's complexity is O(1).

|  Variable Name  | Description | Type |      Size      | Visual Explanation |
|     :---:       |    :----:   | :--: |     :---:     | :-: |
|       n         | Input Number  | Integer |     |  |
|      Disp       | Numbers of the rows available | Array |    `n`   |  |
|       q         | Stores the row of each queen  | HashSet |       `n`      | <img src="./Results-Ss/q.png" alt="q" width="200"/> |
|      Dpos       | Stores the number of Positive Diagonal which is no more longer available        | HashSet |    `(n*2)-1`   | <img src="./Results-Ss/Dpos.png" alt="Dpos" width="200"/> |
|      Dneg       | Stores the number of Negative Diagonal which is no more longer available | HashSet |    `(n*2)-1`   | <img src="./Results-Ss/Dneg.png" alt="Dneg" width="200"/> |


---
## Installation
To install this repository correctly follow the next steps.

1. First of all, in the terminal put the next code to clone this repository:

```sh
    git clone https://github.com/Rafael-Anguiano/N-Queens.git
    cd N-Queens/
```

2. The next step is to make sure you have a way to run this code, in this situation we will use [Node.js](https://nodejs.org/en/download/), if you don't have it installed, we recommend you to download it.


3. Once you have installed a runner, you are ready to start simulating and editing some code. To run this app use the next command in the terminal (Be sure you are in the correct directory).

```sh
    node N-Queens.js
```
--- 
## Notes:
 - There are many different ways to solve this puzzle with the same input.
 - The algorithm have a random percentage, this means you could receive a different solution each time.
 - The Queen can move in its line or row, or diagonally, any number of squares.

---
## ScreenShots of the Results
<img src="./Results-Ss/Case%20Failed.png" alt="Case Failed" width="300"/>
<img src="./Results-Ss/Case%201.png" alt="Case 1" width="300"/>
<img src="./Results-Ss/Case%204.png" alt="Case 4" width="300"/>
<img src="./Results-Ss/Case%208.png" alt="Case 8" width="300"/>
<img src="./Results-Ss/Case%2010.png" alt="Case 10" width="300"/>
<img src="./Results-Ss/Case%2026.png" alt="Case 26" width="300"/>
<img src="./Results-Ss/Case%2045.png" alt="Case 45" width="300"/>


---
## Developed By:
    Rafael de Jesús Anguiano Suárez del Real (April 2022)

