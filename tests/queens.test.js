const Queens = require('../src/queens')

describe('Test in Queens file', () => { 
    test('Should receive an error string', () => { 
        expect(Queens(2)).toEqual(`Not posible! ${2} < 4 and it's different of 1`);
    })
    test('Should Receive an Error String', () => { 
        expect(Queens('abs')).toEqual(`It was not posible`);
    })
    test('Should Receive an Object with the correct', () => { 
        let boardSize = 4;
        let queens = Queens(boardSize)
        expect(typeof queens).toBe('object')
        expect(queens.size).toBe(boardSize)
    })
})