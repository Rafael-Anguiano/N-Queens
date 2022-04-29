import sys
import datetime

from src.LOGs import LOG
from src.n_queen import n_queens
from src.solution import print_solution


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
