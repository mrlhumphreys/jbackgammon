import ExtraPoint from '../src/extra_point'
import Piece from '../src/piece'

describe('ExtraPoint', () => {
  describe('initalising a bar', () => {
    it('must set the pieces', () => {
      let extraPoint = new ExtraPoint({pieces: []});
      expect(extraPoint.pieces).toEqual([]);
    });
  });

  describe('asJson', () => {
    it('must return the bar as json', () => {
      let extraPoint = new ExtraPoint({ pieces: [ { player_number: 1 } ] });
      expect(extraPoint.asJson).toEqual({ pieces: [ { player_number: 1 } ], selected: false });
    });
  });

  describe('piecesOwnedBy', () => {
    it('must return all pieces owned by the player', () => {
      let extraPoint = new ExtraPoint({pieces: [{player_number: 1}, {player_number: 2}]});
      let pieces = extraPoint.piecesOwnedByPlayer(1);

      expect(pieces.length).toEqual(1);
      expect(pieces[0].playerNumber).toEqual(1);
    });
  });

  describe('push', () => {
    it('must push the piece onto it', () => {
      let extraPoint = new ExtraPoint({pieces: []});
      let piece = new Piece({player_number: 1});
      extraPoint.push(piece);
      expect(extraPoint.pieces.length).toEqual(1);
    });
  });

});
