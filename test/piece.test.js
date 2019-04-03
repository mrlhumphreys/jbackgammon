import Piece from '../src/piece'

describe('Piece', () => {
  describe('initalising a piece', () => {
    it('must set the owner', () => {
      let piece = new Piece({owner: 1});
      expect(piece.owner).toEqual(1);
    });
  });

  describe('asJson', () => {
    it('must return the piece as json', () => {
      let piece = new Piece({owner: 1});
      expect(piece.asJson()).toEqual({owner: 1});
    });
  });
});
