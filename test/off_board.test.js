import OffBoard from '../src/off_board'

describe('OffBoard', () => {
  describe('initalising a off', () => {
    it('must set the pieces', () => {
      let offBoard = new OffBoard({pieces: []});
      expect(offBoard.pieces).toEqual([]);
    });
  });

  describe('piecesOwnedBy', () => {
    it('must return all pieces owned by the player', () => {
      let offBoard = new OffBoard({pieces: [{owner: 1}, {owner: 2}]});
      let pieces = offBoard.piecesOwnedByPlayer(1);

      expect(pieces.length).toEqual(1);
      expect(pieces[0].owner).toEqual(1);
    });
  });
});
