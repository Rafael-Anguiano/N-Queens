import datetime
import random
import string 
import sys

class LOG :
    CEND      = '\33[0m'
    CBOLD     = '\33[1m'
    CITALIC   = '\33[3m'
    CURL      = '\33[4m'
    CBLINK    = '\33[5m'
    CBLINK2   = '\33[6m'
    CSELECTED = '\33[7m'

    CBLACK  = '\33[30m'
    CRED    = '\33[31m'
    CGREEN  = '\33[32m'
    CYELLOW = '\33[33m'
    CBLUE   = '\33[34m'
    CVIOLET = '\33[35m'
    CBEIGE  = '\33[36m'
    CWHITE  = '\33[37m'

    CBLACKBG  = '\33[40m'
    CREDBG    = '\33[41m'
    CGREENBG  = '\33[42m'
    CYELLOWBG = '\33[43m'
    CBLUEBG   = '\33[44m'
    CVIOLETBG = '\33[45m'
    CBEIGEBG  = '\33[46m'
    CWHITEBG  = '\33[47m'

    CGREY    = '\33[90m'
    CRED2    = '\33[91m'
    CGREEN2  = '\33[92m'
    CYELLOW2 = '\33[93m'
    CBLUE2   = '\33[94m'
    CVIOLET2 = '\33[95m'
    CBEIGE2  = '\33[96m'
    CWHITE2  = '\33[97m'

    CGREYBG    = '\33[100m'
    CREDBG2    = '\33[101m'
    CGREENBG2  = '\33[102m'
    CYELLOWBG2 = '\33[103m'
    CBLUEBG2   = '\33[104m'
    CVIOLETBG2 = '\33[105m'
    CBEIGEBG2  = '\33[106m'
    CWHITEBG2  = '\33[107m'


def fill_availableRows(board_size):
    availableRows = []
    for x in range(board_size):
        availableRows.append(x)
    return availableRows

def print_solution(queens):

    print(f'{LOG.CVIOLET}---- This is your solution ----{LOG.CEND}')
    alphabet = []

    for letter in range(len(queens) if len(queens)<=26 else 26):
        alphabet.append(f' {string.ascii_uppercase[letter]}')
    if(len(queens) > 26):
        for letter in range(len(queens)-26):
            alphabet.append(f' {string.ascii_lowercase[letter]}')

    isColored = True
    print('  ', *alphabet)

    for i in range(len(queens)):
        row = []
        if len(queens) % 2 == 0:
            isColored = not(isColored)

        for j in range(len(queens)):
            isColored = not(isColored)
            if queens[j] == i:
                row.append(f'{LOG.CREDBG}{LOG.CBLACK if isColored else LOG.CWHITE} 1') 
            else:
                row.append(f'{LOG.CWHITEBG if isColored else LOG.CBLACKBG}{LOG.CBLACK if isColored else LOG.CWHITE} 0')

        print(f'{LOG.CEND}{str(i+1).zfill(2)}', *row, LOG.CEND)


def validator(queens, positive_diagonal, negative_diagonal, available_rows, row, column, board_size):
    if not(available_rows[row] in queens) and not(((board_size-1) - available_rows[row] - column) in positive_diagonal ) and not( (column - available_rows[row]) in negative_diagonal):
        return True
    return False

def placing_queens(queens, positive_diagonal, negative_diagonal, available_rows, column, board_size ):
    laps = 0
    row = random.randint(0, len(available_rows))

    for row in range(len(available_rows)) :
        if validator(queens, positive_diagonal, negative_diagonal, available_rows, row, column, board_size) :

            queens.append(available_rows[row])
            positive_diagonal.append((board_size-1)-available_rows[row]-column)
            negative_diagonal.append(column-available_rows[row])
            value = available_rows.pop(row)

            if len(queens) == board_size: return [True, queens]

            [status, returnedQueens] = placing_queens(queens, positive_diagonal, negative_diagonal, available_rows, column+1, board_size)

            if status : return [status, returnedQueens]

            available_rows.insert(row, value)
            queens.pop()
            positive_diagonal.pop()
            negative_diagonal.pop()

        if row + 1 == len(available_rows) and laps < 1: 
            row = -1 
            laps += 1

    return [False, queens]


def n_queens(board_size):
    if board_size<4 and board_size != 1 : 
        return "Not posible!"

    available_rows = fill_availableRows(board_size)
    column = 0
    negative_diagonal = []
    positive_diagonal = []
    queens = []

    [status, returnedQueens] = placing_queens( queens, positive_diagonal, negative_diagonal, available_rows, column, board_size)

    if not(status) :
        return 'It was not posible' 

    return returnedQueens


for argument in range(1, len(sys.argv)):
    print(f'\n{LOG.CBLUE}****************N-Queens****************{LOG.CEND}')
    print(f'Size of Board: {LOG.CWHITE}{sys.argv[argument]}{LOG.CEND}')

    startTime = datetime.datetime.now()
    queens = n_queens(int(sys.argv[argument]))
    elapsedSeconds = (datetime.datetime.now() - startTime)
    
    if type(queens) != type('string') :
        print(f'Seconds Elapsed: {LOG.CGREEN}{elapsedSeconds}{LOG.CEND}')
        print_solution(queens)

        print("\nQueens positions by column:")
        print(queens) 

    if type(queens) == type('string'):
        print(LOG.CRED, queens, LOG.CEND)
