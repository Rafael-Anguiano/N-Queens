#include <iostream>
#include <stdlib.h>
#include <vector>
#include <unordered_set>
#include <chrono>
#include <conio.h>

using namespace std;

class COLOR {
public:
    string CEND = "\x1b[0m";
    string CBOLD = "\x1b[1m";
    string CITALIC = "\x1b[3m";
    string CURL = "\x1b[4m";
    string CBLINK = "\x1b[5m";
    string CBLINK2 = "\x1b[6m";
    string CSELECTED = "\x1b[7m";

    string CBLACK = "\x1b[30m";
    string CRED = "\x1b[31m";
    string CGREEN = "\x1b[32m";
    string CYELLOW = "\x1b[33m";
    string CBLUE = "\x1b[34m";
    string CVIOLET = "\x1b[35m";
    string CBEIGE = "\x1b[36m";
    string CWHITE = "\x1b[37m";

    string CBLACKBG = "\x1b[40m";
    string CREDBG = "\x1b[41m";
    string CGREENBG = "\x1b[42m";
    string CYELLOWBG = "\x1b[43m";
    string CBLUEBG = "\x1b[44m";
    string CVIOLETBG = "\x1b[45m";
    string CBEIGEBG = "\x1b[46m";
    string CWHITEBG = "\x1b[47m";

    string CGREY = "\x1b[90m";
    string CRED2 = "\x1b[91m";
    string CGREEN2 = "\x1b[92m";
    string CYELLOW2 = "\x1b[93m";
    string CBLUE2 = "\x1b[94m";
    string CVIOLET2 = "\x1b[95m";
    string CBEIGE2 = "\x1b[96m";
    string CWHITE2 = "\x1b[97m";

    string CGREYBG = "\x1b[100m";
    string CREDBG2 = "\x1b[101m";
    string CGREENBG2 = "\x1b[102m";
    string CYELLOWBG2 = "\x1b[103m";
    string CBLUEBG2 = "\x1b[104m";
    string CVIOLETBG2 = "\x1b[105m";
    string CBEIGEBG2 = "\x1b[106m";
    string CWHITEBG2 = "\x1b[107m";

};

class MyClass {
public:
    bool status = false;
    unordered_set <int> queens;
    string error;
    MyClass(bool st, unordered_set<int> queen, string err) {
        status = st;
        queens = queen;
        error = err;
    }
};

class State {
public:
    unordered_set <int> Queens;
    unordered_set <int> PositiveDiagonal;
    unordered_set <int> NegativeDiagonal;
    vector <int> AvailableRows;

    State(int BoardSize) {
        for (int i = 0; i < BoardSize; i++)
            AvailableRows.push_back(i);
    }
};

int printSolution(int BoardSize, unordered_set <int> Queens) {
    if (Queens.size() == 0)
        return 1;

    const COLOR LOG;

    cout << LOG.CVIOLET << "---- This is your solution ----" << LOG.CEND << endl;

    bool isColored = true;
    unordered_set<int> ::iterator itr;

    cout << "   ";
    for (int i = 1; i <= BoardSize; ++i) {
        cout << " " << i % 10 << " ";
    }
    cout << endl;

    for (int i = 0; i < Queens.size(); i++) {

        if (Queens.size() % 2 == 0) isColored = !isColored;

        vector <string> row;

        for (itr = Queens.begin(); itr != Queens.end(); itr++) {
            isColored = !isColored;
            if (*itr == i) {
                if (isColored) {
                    row.push_back(LOG.CREDBG + LOG.CBLACK + " 1");
                    continue;
                }
                row.push_back(LOG.CREDBG + LOG.CWHITE + " 1");
                continue;
            }

            if (isColored) {
                row.push_back(LOG.CWHITEBG + LOG.CBLACK + " 0");
                continue;
            }
            row.push_back(LOG.CBLACKBG + LOG.CWHITE + " 0");
        }

        cout << " " << (i + 1) % 10 << " ";
        for (string value : row) {
            cout << value << " ";
        }
        cout << LOG.CEND << endl;
    }
    return 1;
}


bool Validator(State state, int row, int column, int BoardSize) {
    if (state.Queens.find(state.AvailableRows[row]) != state.Queens.end()) {
        return false;
    }
    if (state.PositiveDiagonal.find((BoardSize - 1) - state.AvailableRows[row] - column) != state.PositiveDiagonal.end()) {
        return false;
    }
    if (state.NegativeDiagonal.find(column - state.AvailableRows[row]) != state.NegativeDiagonal.end()) {
        return false;
    }
    return true;
}

MyClass PlacingQueens(State state, int column, const int BoardSize) {
    srand(time(NULL));
    int laps{ 0 };
    int row = rand() % state.AvailableRows.size() + 0;

    for (row; row < state.AvailableRows.size(); row++) {
        if (Validator(state, row, column, BoardSize)) {
            state.Queens.insert(state.AvailableRows[row]);
            state.PositiveDiagonal.insert((BoardSize - 1) - state.AvailableRows[row] - column);
            state.NegativeDiagonal.insert(column - state.AvailableRows[row]);
            int value{ state.AvailableRows[row] };
            state.AvailableRows.erase(state.AvailableRows.begin() + row);

            if (state.Queens.size() == BoardSize) {
                MyClass returned(true, state.Queens, "");
                return returned;
            }
            MyClass returnedQueens = PlacingQueens(state, column + 1, BoardSize);

            if (returnedQueens.status) {
                return returnedQueens;
            }

            state.AvailableRows.insert(state.AvailableRows.begin() + row, value);
            state.Queens.erase(state.AvailableRows[row]);
            state.PositiveDiagonal.erase((BoardSize - 1) - state.AvailableRows[row] - column);
            state.NegativeDiagonal.erase(column - state.AvailableRows[row]);
        }
        if (row + 1 == state.AvailableRows.size() && laps < 1) {
            row = -1;
            laps += 1;
        }
    }
    MyClass returned(false, state.Queens, "It was not posible");
    return returned;
}

MyClass NQueens(const int BoardSize) {

    State state(BoardSize);

    if (BoardSize < 4 && BoardSize != 1) {
        MyClass UnableToResolve(false, state.Queens, "Not Posible with this Board Size");
        return UnableToResolve;
    }

    int column{ 0 };

    MyClass solution = PlacingQueens(state, column, BoardSize);

    return solution;
}

int main()
{
    int BoardSize{};
    cout << "Please enter a board size: ";
    cin >> BoardSize;

    COLOR LOG;
    cout << LOG.CBLUE2 << "\n**************** N - Queens ****************\n" << LOG.CEND;
    cout << "Size of Board : " << BoardSize << "\n";

    auto start = chrono::steady_clock::now();
    MyClass solution = NQueens(BoardSize);
    auto end = chrono::steady_clock::now();

    if (!solution.status) {
        cout << solution.error << endl;
        return 1;
    }
    cout << "Seconds Elapsed: "
        << LOG.CGREEN
        << chrono::duration_cast<chrono::seconds>(end - start).count()
        << " s" << LOG.CEND << endl;
    printSolution(BoardSize, solution.queens);
    system("pause");
    return 0;
}