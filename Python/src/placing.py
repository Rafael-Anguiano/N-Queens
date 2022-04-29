import random

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