import { ActivitySelection } from './ActivitySelection';

describe('Activity Selection', () => {
    it('should select the maximum number of activities', () => {
        const start = [1, 3, 0, 5, 8, 5];
        const finish = [2, 4, 6, 7, 9, 9];
        const expected = 4;
        const result = ActivitySelection(start, finish);
        expect(result).toEqual(expected);
    });
});
