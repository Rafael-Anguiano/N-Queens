from placing import placing_queens

def fill_availableRows(board_size):
    availableRows = []
    for x in range(board_size):
        availableRows.append(x)
    return availableRows

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