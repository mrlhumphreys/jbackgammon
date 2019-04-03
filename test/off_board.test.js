import OffBoard from '../src/off_board'
import Piece from '../src/piece'

describe('OffBoard', () => {
  describe('initalising a off', () => {
    it('must set the pieces', () => {
      let offBoard = new OffBoard({pieces: []});
      expect(offBoard.pieces).toEqual([]);
    });
  });

  describe('asJson', () => {
    it('must return off board as json', () => {
      let offBoard = new OffBoard({ pieces: [ { owner: 1 } ] });
      expect(offBoard.asJson()).toEqual({
        pieces: [
          { owner: 1 }
        ],
        selected: false
      });
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

  describe('push', () => {
    it('must push the piece onto it', () => {
      let offBoard = new OffBoard({pieces: []});
      let piece = new Piece({owner: 1});
      offBoard.push(piece);
      expect(offBoard.pieces[0]).toEqual(piece);
    });
  });
});
