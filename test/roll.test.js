import fixtures from './fixtures'
import Roll from '../src/roll'

describe('Roll', () => {
  describe('result', () => {
    describe('with winner', () => {
      it('returns a game over result', () => {
        let match = fixtures('winnerMatch');
        let roll = new Roll({ 
          playerNumber: 1,
          match: match 
        });
         
        let result = roll.result;

        expect(result.name).toEqual('GameOver');
        expect(result.message).toEqual('Game is over.');
      });
    });

    describe('not on the players turn', () => {
      it('returns a not players turn result', () => {
        let match = fixtures('rollMatch');
        let roll = new Roll({ 
          playerNumber: 2,
          match: match 
        });
         
        let result = roll.result;

        expect(result.name).toEqual('NotPlayersTurn');
        expect(result.message).toEqual('It is not your turn.');
      });
    });

    describe('on the move phase', () => {
      it('returns a move phase result', () => {
        let match = fixtures('moveMatch');
        let roll = new Roll({ 
          playerNumber: 1,
          match: match 
        });
         
        let result = roll.result;

        expect(result.name).toEqual('MovePhase');
        expect(result.message).toEqual('Dice have already been rolled.');
      });
    });

    describe('a valid roll', () => {
      it('returns a roll valid result', () => {
        let match = fixtures('rollMatch');
        let roll = new Roll({ 
          playerNumber: 1,
          match: match 
        });
         
        let result = roll.result;

        expect(result.name).toEqual('RollValid');
        expect(result.message).toEqual('Dice have been rolled.');
      });
    });
  });
});
