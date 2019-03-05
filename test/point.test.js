import Point from '../src/point'
import Piece from '../src/piece'

describe('Point', () => {
  describe('initalising a point', () => {
    it('must set the pieces and number', () => {
      let point = new Point({pieces: [], number: 1});
      expect(point.pieces).toEqual([]);
      expect(point.number).toEqual(1);
    });
  });

  describe('a point between 19 and 24', () => {
    it('must be home for player 1', () => {
      let point = new Point({pieces: [], number: 21});
      expect(point.home(1)).toBe(true);
    });

    it('must not be home for player 2', () => {
      let point = new Point({pieces: [], number: 21});
      expect(point.home(2)).toBe(false);
    });
  });

  describe('a point between 1 and 6', () => {
    it('must not be home for player 1', () => {
      let point = new Point({pieces: [], number: 3});
      expect(point.home(1)).toBe(false);
    });

    it('must be home for player 2', () => {
      let point = new Point({pieces: [], number: 3});
      expect(point.home(2)).toBe(true);
    });
  });

  describe('the distance from off the board for a point for player 1', () => {
    it('must be the distance from point 25', () => {
      let point = new Point({pieces: [], number: 21});
      expect(point.distanceFromOffBoard(1)).toEqual(4);
    });
  });

  describe('the distance from off the board for a point of player 2', () => {
    it('must have a distance from point 0', () => {
      let point = new Point({pieces: [], number: 3});
      expect(point.distanceFromOffBoard(2)).toEqual(3);
    });
  });

  describe('a point with pieces', () => {
    it('must not be empty', () => {
      let point = new Point({pieces: [{owner: 1}], number: 3});
      expect(point.empty()).toBe(false);
    });
  });

  describe('a point with no pieces', () => {
    it('must be empty', () => {
      let point = new Point({pieces: [], number: 3});
      expect(point.empty()).toBe(true);
    });
  });

  describe('a point with more than one piece', () => {
    it('must be blocked', () => {
      let point = new Point({pieces: [{owner: 1}, {owner: 2}], number: 3});
      expect(point.blocked()).toBe(true);
    });
  });

  describe('a point with player pieces', () => {
    it('must be owned by the player', () => {
      let point = new Point({pieces: [{owner: 1}], number: 3});
      expect(point.ownedBy(1)).toBe(true);
    });

    it('must not be owned by the oppoent', () => {
      let point = new Point({pieces: [{owner: 1}], number: 3});
      expect(point.ownedByOpponent(1)).toBe(false);
    });
  });

  describe('a point with opponent pieces', () => {
    it('must be owned by the opponent', () => {
      let point = new Point({pieces: [{owner: 2}], number: 3});
      expect(point.ownedByOpponent(1)).toBe(true);
    });

    it('must not be owned by the player', () => {
      let point = new Point({pieces: [{owner: 2}], number: 3});
      expect(point.ownedBy(1)).toBe(false);
    });

    describe('with one piece', () => {
      it('must be an enemy blot', () => {
        let point = new Point({pieces: [{owner: 2}], number: 3});
        expect(point.enemyBlot(1)).toBe(true);
      });
    });

    describe('with more than one piece', () => {
      it('must not be an enemy blot', () => {
        let point = new Point({pieces: [{owner: 2}, {owner: 2}], number: 3});
        expect(point.enemyBlot(1)).toBe(false);
      });
    });
  });

  describe('select', () => {
    it('must select the point', () => {
      let point = new Point({pieces: [], number: 3, selected: false});
      point.select();
      expect(point.selected).toBe(true);
    });
  });

  describe('deselect', () => {
    it('must deselect the point', () => {
      let point = new Point({pieces: [], number: 3, selected: true});
      point.deselect();
      expect(point.selected).toBe(false);
    });
  });

  describe('pop', () => {
    it('must remove a piece', () => {
      let point = new Point({number: 1, pieces: [{owner: 1}, {owner: 1}]});
      point.pop(); 
      expect(point.pieces.length).toEqual(1);
    });

    it('must return a piece', () => {
      let point = new Point({number: 1, pieces: [{owner: 1}, {owner: 1}]});
      let piece = point.pop();
      expect(piece.owner).toEqual(1);
    });
  });

  describe('push', () => {
    it('must add a piece', () => {
      let point = new Point({number: 1, pieces: [{owner: 1}]});
      let piece = new Piece({owner: 1});
      point.push(piece);
      expect(point.pieces.length).toEqual(2);
    });
  });
});
