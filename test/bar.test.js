import Bar from '../src/bar'
import Piece from '../src/piece'

describe('Bar', () => {
  describe('initalising a bar', () => {
    it('must set the pieces', () => {
      let bar = new Bar({pieces: []});
      expect(bar.pieces).toEqual([]);
    });
  });

  describe('piecesOwnedBy', () => {
    it('must return all pieces owned by the player', () => {
      let bar = new Bar({pieces: [{owner: 1}, {owner: 2}]});
      let pieces = bar.piecesOwnedByPlayer(1);

      expect(pieces.length).toEqual(1);
      expect(pieces[0].owner).toEqual(1);
    });
  });

  describe('a bar with only pieces owned by a player', () => {
    it('must have pieces owned by that player', () => {
      let bar = new Bar({pieces: [{owner: 1}]});
      expect(bar.hasPiecesOwnedByPlayer(1)).toBe(true);
    });

    it('must not have pieces owned by another player', () => {
      let bar = new Bar({pieces: [{owner: 1}]});
      expect(bar.noPiecesOwnedByPlayer(2)).toBe(true);
    });
  });

  describe('select', () => {
    it('must mark the bar as selected', () => {
      let bar = new Bar({pieces: [], selected: false});
      bar.select();
      expect(bar.selected).toBe(true);
    });
  });

  describe('deselect', () => {
    it('must mark the bar as not selected', () => {
      let bar = new Bar({pieces: [], selected: true});
      bar.deselect();
      expect(bar.selected).toBe(false);
    });
  });

  describe('pop', () => {
    describe('with a piece owned by the player', () => {
      it('must remove the piece owned by that player from it', () => {
        let bar = new Bar({pieces: [{owner: 1}, {owner: 2}]});
        bar.pop(1);
        expect(bar.pieces.length).toEqual(1); 
      });

      it('must return the piece', () => {
        let bar = new Bar({pieces: [{owner: 1}, {owner: 2}]});
        let piece = bar.pop(1);
        expect(piece.owner).toEqual(1); 
      });
    });

    describe('with no pieces owned by the player', () => {
      it('must not modify the pieces', () => {
        let bar = new Bar({pieces: [{owner: 2}]});
        bar.pop(1);
        expect(bar.pieces.length).toEqual(1); 
      });

      it('must return undefined', () => {
        let bar = new Bar({pieces: [{owner: 2}]});
        let piece = bar.pop(1);
        expect(piece).toBe(undefined); 
      });
    });
  });

  describe('push', () => {
    it('must push the piece onto it', () => {
      let bar = new Bar({pieces: []});
      let piece = new Piece({owner: 1}); 
      bar.push(piece);
      expect(bar.pieces.length).toEqual(1);
    });
  });
});
