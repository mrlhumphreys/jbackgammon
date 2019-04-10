import OffBoard from '../src/off_board'
import Piece from '../src/piece'

describe('OffBoard', () => {
  describe('initalising a off', () => {
    it('must set the pieces', () => {
      let offBoard = new OffBoard({pieces: []});
      expect(offBoard.pieces).toEqual([]);
    });
  });

  describe('enemyBlot', () => {
    it('must return false', () => {
      let offBoard = new OffBoard({pieces: []});
      expect(offBoard.enemyBlot(1)).toBe(false);
    });
  });
});
