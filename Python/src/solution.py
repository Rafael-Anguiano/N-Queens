import string

from LOGs import LOG

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
