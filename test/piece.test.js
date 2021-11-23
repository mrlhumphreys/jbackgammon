import Piece from '../src/piece'

describe('Piece', () => {
  describe('initalising a piece', () => {
    it('must set the playerNumber and id', () => {
      let piece = new Piece({player_number: 1, id: 1});
      expect(piece.id).toEqual(1);
      expect(piece.playerNumber).toEqual(1);
    });
  });

  describe('asJson', () => {
    it('must return the piece as json', () => {
      let piece = new Piece({player_number: 1, id: 1});
      expect(piece.asJson).toEqual({player_number: 1, id: 1});
    });
  });
});
