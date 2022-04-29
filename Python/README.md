# Python Solution

## Solution Explanation
For this solution we needed to replace the Set() class for simple arrays, this replacement raise the complexity time. 

|  Variable Name  | Description | Type |      Size      | Visual Explanation |
|     :---:       |    :----:   | :--: |     :---:     | :-: |
|       board_size         | Input Number  | Integer |     |  |
|      available_rows       | Numbers of the rows available | Array |    `n`   |  |
|       queens         | Stores the row of each queen  | Array |       `n`      | <img src="./Results-Ss/q.png" alt="q" width="200"/> |
|      positive_diagonal       | Stores the number of Positive Diagonal which is no more longer available        | Array |    `(n*2)-1`   | <img src="./Results-Ss/Dpos.png" alt="Dpos" width="200"/> |
|      negative_diagonal       | Stores the number of Negative Diagonal which is no more longer available | Array |    `(n*2)-1`   | <img src="./Results-Ss/Dneg.png" alt="Dneg" width="200"/> |

---
## Installation
To install this repository correctly follow the next steps.

1. First of all, in the terminal put the next code to clone this repository:

    ```sh
        git clone https://github.com/Rafael-Anguiano/N-Queens.git
        cd N-Queens/Python
    ```

2. The next step is to make sure you have [Python](https://www.python.org/downloads/) installed, if you don't have it installed, we recommend you to download it.
    * To check in you have it intalled run this command line to see which version you have. In case it throw something different than the version, try to install Python again.
    ```sh
        python --version
    ```


3. Once you have installed a runner, you are ready to start simulating and editing some code. To run this app use the next command in the terminal (Be sure you are in the correct directory).

    ```sh
        python main.py <boardSize1> <boardSize2> <boarSize...>
    ```

    or
    ```sh
        python all_in_one.py <boardSize1> <boardSize2> <boarSize...>
    ```
