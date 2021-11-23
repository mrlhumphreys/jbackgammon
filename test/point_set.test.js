import fixtures from './fixtures'
import Die from '../src/die'
import DiceSet from '../src/dice_set'
import Point from '../src/point'
import Bar from '../src/bar'
import PointSet from '../src/point_set'

describe('PointSet', () => {
  describe('initalising a pointSet', () => {
    it('must set the points', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});

      let pointSet = new PointSet([pointOne]);
      expect(pointSet.points).not.toBe(undefined);
    });
  });

  describe('asJson', () => {
    it('must return the point set as json', () => {
      let pointSet = fixtures('pointSet'); 
      expect(pointSet.asJson).toEqual([
        { number: 1, selected: false, pieces: [ { player_number: 1 }, { player_number: 1 } ] },
        { number: 2, selected: false, pieces: [ ] },
        { number: 3, selected: false, pieces: [ ] },
        { number: 4, selected: false, pieces: [ ] },
        { number: 5, selected: false, pieces: [ ] },
        { number: 6, selected: false, pieces: [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
        { number: 7, selected: false, pieces: [ ] },
        { number: 8, selected: false, pieces: [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
        { number: 9, selected: false, pieces: [ ] },
        { number: 10, selected: false, pieces: [ ] },
        { number: 11, selected: false, pieces: [ ] },
        { number: 12, selected: false, pieces: [ { player_number: 1 }, { player_number: 1 }, { player_number: 1 }, { player_number: 1 }, { player_number: 1 } ] },
        { number: 13, selected: false, pieces: [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
        { number: 14, selected: false, pieces: [ ] },
        { number: 15, selected: false, pieces: [ ] },
        { number: 16, selected: false, pieces: [ ] },
        { number: 17, selected: false, pieces: [ { player_number: 1 }, { player_number: 1 }, { player_number: 1 } ] },
        { number: 18, selected: false, pieces: [ ] },
        { number: 19, selected: false, pieces: [ { player_number: 1 }, { player_number: 1 }, { player_number: 1 }, { player_number: 1 }, { player_number: 1 } ] },
        { number: 20, selected: false, pieces: [ ] },
        { number: 21, selected: false, pieces: [ ] },
        { number: 22, selected: false, pieces: [ ] },
        { number: 23, selected: false, pieces: [ ] },
        { number: 24, selected: false, pieces: [ { player_number: 2 }, { player_number: 2 } ] },
      ]);
    });
  });

  describe('every', () => {
    it('must pass the callback to the points every function', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});

      let pointSet = new PointSet([pointOne]);
      expect(pointSet.every(function(p) { return p.number != 5; })).toBe(true);
    });
  });

  describe('some with callback', () => {
    it('must pass the callback to the points every function', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});

      let pointSet = new PointSet([pointOne]);
      expect(pointSet.some(function(p) { return p.number == 1; })).toBe(true);
    });
  });

  describe('a pointset with no points', () => {
    it('must not have some points', () => {
      let emptyPointSet = new PointSet([]);
      expect(emptyPointSet.some()).toBe(false);
    });

    it('must have none points', () => {
      let emptyPointSet = new PointSet([]);
      expect(emptyPointSet.none).toBe(true);
    });
  });

  describe('a pointset with points', () => {
    it('must have some points', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});
      let pointSet = new PointSet([pointOne]);
      expect(pointSet.some()).toBe(true);
    });

    it('must not have none points', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});
      let pointSet = new PointSet([pointOne]);
      expect(pointSet.none).toBe(false);
    });
  });

  describe('sort', () => {
    it('must sort the points by number', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});
      let pointTwo = new Point({number: 2, pieces: []});
      let pointThree = new Point({number: 3, pieces: []});
      let pointFour = new Point({number: 4, pieces: [{player_number: 2}]});

      let unsortedPointSet = new PointSet([pointTwo, pointFour, pointOne, pointThree]);
      let sorted = unsortedPointSet.sort;
      expect(sorted.first.number).toEqual(1);
      expect(sorted.last.number).toEqual(4);
    });
  });

  describe('first', () => {
    it('must return the first point', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});
      let pointTwo = new Point({number: 2, pieces: []});

      let pointSet = new PointSet([pointOne, pointTwo]);
      expect(pointSet.first.number).toEqual(1);
    });
  });

  describe('last', () => {
    it('must return the last point', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});
      let pointTwo = new Point({number: 2, pieces: []});

      let pointSet = new PointSet([pointOne, pointTwo]);
      expect(pointSet.last.number).toEqual(2);
    });
  });

  describe('a point is in a point set', () => {
    it('must be included', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});
      let pointTwo = new Point({number: 2, pieces: []});

      let pointSet = new PointSet([pointOne]);
      expect(pointSet.includes(pointOne)).toBe(true);
    });
  });

  describe('a point is not in a point set', () => {
    it('must not be included', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});
      let pointTwo = new Point({number: 2, pieces: []});
      let pointNotInSet = new Point({number: 7, pieces: []});

      let pointSet = new PointSet([pointOne, pointTwo]);
      expect(pointSet.includes(pointNotInSet)).toBe(false);
    });
  });

  describe('given a point with rolled dice for a player', () => {
    it('must have destination points', () => {
      let dieOne = new Die({number: 1});
      let dieTwo = new Die({number: 2});
      let dice = new DiceSet([dieOne, dieTwo]);

      let pointTwo = new Point({number: 2, pieces: []});
      let pointThree = new Point({number: 3, pieces: []});
      let pointFour = new Point({number: 4, pieces: [{player_number: 2}]});

      let pointSet = new PointSet([pointTwo, pointThree, pointFour]);
      let destinations = pointSet.destinations(pointTwo, dice, 1);
      expect(destinations.some()).toBe(true);
    });
  });

  describe('given a point with some used dice for a player', () => {
    it('must not include a destination for a used die', () => {
      let dieOne = new Die({number: 1});
      let dieUsed = new Die({number: 2, used: true});
      let usedDice = new DiceSet([dieOne, dieUsed]);

      let pointTwo = new Point({number: 2, pieces: []});
      let pointThree = new Point({number: 3, pieces: []});
      let pointFour = new Point({number: 4, pieces: [{player_number: 2}]});

      let pointSet = new PointSet([pointTwo, pointThree, pointFour]);
      let destinations = pointSet.destinations(pointTwo, usedDice, 1);
      expect(destinations.findByNumber(4)).toBe(undefined);
    });
  });

  describe('given a point with some dice for a player and some blocked points', () => {
    it('must not have blocked points as destinations', () => {
      let dieOne = new Die({number: 1});
      let dieUsed = new Die({number: 2, used: true});
      let usedDice = new DiceSet([dieOne, dieUsed]);

      let pointTwo = new Point({number: 2, pieces: []});
      let pointThree = new Point({number: 3, pieces: []});
      let pointBlocked = new Point({number: 4, pieces: [{player_number: 2}, {player_number: 2}]});

      let blockedPointSet = new PointSet([pointTwo, pointThree, pointBlocked]);
      let destinations = blockedPointSet.destinations(pointTwo, usedDice, 1);
      expect(destinations.findByNumber(4)).toBe(undefined);
    });
  });

  describe('given a point with some dice for a player and some blots', () => {
    it('must have the blots as destinations', () => {
      let dieOne = new Die({number: 1});
      let dieTwo = new Die({number: 2});
      let dice = new DiceSet([dieOne, dieTwo]);

      let pointTwo = new Point({number: 2, pieces: []});
      let pointThree = new Point({number: 3, pieces: []});
      let pointFour = new Point({number: 4, pieces: [{player_number: 2}]});

      let pointSet = new PointSet([pointTwo, pointThree, pointFour]);
      let destinations = pointSet.destinations(pointTwo, dice, 1);
      expect(destinations.findByNumber(4)).not.toBe(undefined);
    });
  });

  describe('owned by player', () => {
    it('must return all points with pieces owned by the player', () => {
      let pointOne = { number: 1, pieces: [{id: 1, player_number: 1}, {id: 2, player_number: 1}] };
      let pointTwo = { number: 2, pieces: [] };
      let pointThree = { number: 3, pieces: [] };
      let pointFour = { number: 4, pieces: [{id: 3, player_number: 2}] };

      let pointSet = new PointSet([pointOne, pointTwo, pointThree, pointFour]);
      expect(pointSet.ownedByPlayer(1).first.number).toEqual(1);
    });
  });

  describe('findByNumber', () => {
    it('must return the point with that number', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});
      let pointTwo = new Point({number: 2, pieces: []});
      let pointThree = new Point({number: 3, pieces: []});
      let pointFour = new Point({number: 4, pieces: [{player_number: 2}]});

      let pointSet = new PointSet([pointOne, pointTwo, pointThree, pointFour]);
      expect(pointSet.findByNumber(4).number).toEqual(4);
    });
  });

  describe('destination for player one', () => {
    describe('from a bar', () => {
      it('must return a point with die value greater than 0', () => {
        let dieOne = new Die({number: 1});

        let bar = new Bar({pieces: []});

        let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});
        let pointTwo = new Point({number: 2, pieces: []});

        let pointSet = new PointSet([pointOne, pointTwo]);
        expect(pointSet.destination(bar, dieOne, 1).number).toEqual(1);
      });
    });

    describe('from a point', () => {
      it('must return a point with die value greater than the origin', () => {
        let dieOne = new Die({number: 1});

        let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});
        let pointTwo = new Point({number: 2, pieces: []});

        let pointSet = new PointSet([pointOne, pointTwo]);
        expect(pointSet.destination(pointOne, dieOne, 1).number).toEqual(2);
      });
    });
  });

  describe('destination for player two', () => {
    describe('from a bar', () => {
      it('must return a point with die value less than 25', () => {
        let dieOne = new Die({number: 1});

        let bar = new Bar({pieces: []});

        let pointTwentyThree = new Point({number: 23, pieces: [{player_number: 2}]});
        let pointTwentyFour = new Point({number: 24, pieces: [{player_number: 2}]});

        let pointSet = new PointSet([pointTwentyThree, pointTwentyFour]);
        expect(pointSet.destination(bar, dieOne, 2).number).toEqual(24);
      });
    });

    describe('from a point', () => {
      it('must return a point with die value less than the origin', () => {
        let dieOne = new Die({number: 1});

        let pointTwentyThree = new Point({number: 23, pieces: [{player_number: 2}]});
        let pointTwentyFour = new Point({number: 24, pieces: [{player_number: 2}]});

        let pointSet = new PointSet([pointTwentyThree, pointTwentyFour]);
        expect(pointSet.destination(pointTwentyFour, dieOne, 2).number).toEqual(23);
      });
    });
  });

  describe('backpoint for player one', () => {
    it('must be the lowest point with pieces owned by player one', () => {
      let pointOne = { number: 1, pieces: [{player_number: 1}, {player_number: 1}] };
      let pointTwo = { number: 2, pieces: [] };

      let pointSet = new PointSet([pointOne, pointTwo]);
      expect(pointSet.backPointForPlayer(1).number).toBe(1);
    });
  });

  describe('backpoint for player two', () => {
    it('must be the highest point with pieces owned by player two', () => {
      let pointTwentyThree = { number: 23, pieces: [{player_number: 2}] };
      let pointTwentyFour = { number: 24, pieces: [{player_number: 2}] };

      let pointSet = new PointSet([pointTwentyThree, pointTwentyFour]);
      expect(pointSet.backPointForPlayer(2).number).toBe(24);
    });
  });

  describe('a set where pieces are close to the end', () => {
    it('must have all pieces home', () => {
      let pointNineteen = new Point({number: 19, pieces: [{player_number: 1}]});
      let pointSet = new PointSet([pointNineteen]);

      expect(pointSet.somePiecesNotHome(1)).toBe(false);
    });

    it('must be able to bear off', () => {
      let pointNineteen = { number: 19, pieces: [{player_number: 1}] };
      let pointSet = new PointSet([pointNineteen]);
      let dice = new DiceSet([{number: 6}, {number: 5}]);

      expect(pointSet.cannotBearOff(1, dice)).toBe(false);
    });
  });

  describe('a set where pieces are not close to the end', () => {
    it('must have some pieces not home', () => {
      let pointEighteen = { number: 18, pieces: [{player_number: 1}] };
      let pointSet = new PointSet([pointEighteen]);

      expect(pointSet.somePiecesNotHome(1)).toBe(true);
    });

    it('must not be able to bear off', () => {
      let pointEighteen = { number: 18, pieces: [{player_number: 1}] };
      let pointSet = new PointSet([pointEighteen]);
      let dice = new DiceSet([{number: 6}, {number: 5}]);

      expect(pointSet.cannotBearOff(1, dice)).toBe(true);
    });
  });

  describe('with a point selected', () => {
    it('must be selected', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});
      let pointSelected = new Point({number: 5, pieces: [{player_number: 1}], selected: true});

      let selectedPointSet = new PointSet([pointOne, pointSelected]);
      expect(selectedPointSet.selected.number).toBe(pointSelected.number);
    });
  });

  describe('without a point selected', () => {
    it('must not be selected', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});
      let pointTwo = new Point({number: 2, pieces: []});

      let pointSet = new PointSet([pointOne, pointTwo]);
      expect(pointSet.selected).toBe(undefined);
    });
  });

  describe('deslecting a point set', () => {
    it('must deselect all the points', () => {
      let pointOne = new Point({number: 1, pieces: [{player_number: 1}, {player_number: 1}]});
      let pointSelected = new Point({number: 5, pieces: [{player_number: 1}], selected: true});

      let selectedPointSet = new PointSet([pointOne, pointSelected]);
      selectedPointSet.deselect();
      expect(selectedPointSet.selected).toBe(undefined);
    });
  });
});
