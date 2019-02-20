import Bar from '../src/bar'

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
});
