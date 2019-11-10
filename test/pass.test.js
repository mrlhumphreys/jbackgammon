import fixtures from './fixtures'
import Pass from '../src/pass'

describe('Pass', () => {
  describe('result', () => {
    describe('with winner', () => {
      it('returns a game over result', () => {
        let match = fixtures('winnerMatch');
        let pass = new Pass({ 
          playerNumber: 1,
          match: match 
        });
         
        let result = pass.result;

        expect(result.name).toEqual('GameOver');
        expect(result.message).toEqual('Game is over.');
      });
    });

    describe('not on players turn', () => {
      it('returns a not players turn result', () => {
        let match = fixtures('moveMatch');
        let pass = new Pass({ 
          playerNumber: 2,
          match: match 
        });
         
        let result = pass.result;

        expect(result.name).toEqual('NotPlayersTurn');
        expect(result.message).toEqual('It is not your turn.');
      });
    });

    describe('on the roll phase', () => {
      it('returns a roll phase result', () => {
        let match = fixtures('rollMatch');
        let pass = new Pass({ 
          playerNumber: 1,
          match: match 
        });
         
        let result = pass.result;

        expect(result.name).toEqual('RollPhase');
        expect(result.message).toEqual('Pieces cannot move until the dice are rolled.');
      });
    });

    describe('when moves available', () => {
      it('returns a moves available result', () => {
        let match = fixtures('moveMatch');
        let pass = new Pass({ 
          playerNumber: 1,
          match: match 
        });
         
        let result = pass.result;

        expect(result.name).toEqual('MovesAvailable');
        expect(result.message).toEqual('A move can still be made.');
      });
    });

    describe('when no moves available and all dice used', () => {
      it('returns an all dice used result', () => {
        let match = fixtures('allDiceUsedMatch');
        let pass = new Pass({ 
          playerNumber: 1,
          match: match 
        });
         
        let result = pass.result;

        expect(result.name).toEqual('AllDiceUsed');
        expect(result.message).toEqual('All dice have been used.');
      });
    });

    describe('when no moves available and not all dice used', () => {
      it('returns a passable result', () => {
        let match = fixtures('passableMatch');
        let pass = new Pass({ 
          playerNumber: 1,
          match: match 
        });
         
        let result = pass.result;

        expect(result.name).toEqual('PassValid');
        expect(result.message).toEqual('');
      });
    });
  });
});
