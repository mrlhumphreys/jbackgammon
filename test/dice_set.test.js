import DiceSet from '../src/dice_set'

describe('DiceSet', () => {
  describe('length', () => { 
    it('must return the number of dice in the set', () => {
      let diceSet = new DiceSet([{ "number": null }, { "number": null }]);
      expect(diceSet.length()).toEqual(2);
    });
  });

  describe('filter', () => {
    it('must return dice that match in the callback', () => {
      let diceSet = new DiceSet([{ "number": 1 }, { "number": 2 }]);
      expect(diceSet.filter(function(d) { return d.number == 1; }).length()).toEqual(1);
    });
  });

  describe('map', () => {
    it('must map each dice according to the callback', () => {
      let diceSet = new DiceSet([{ "number": 1 }, { "number": 2 }]);
      expect(diceSet.map(function(d) { return d.number; })).toEqual([1,2]);
    });
  });

  describe('a dice set without dice', () => {
    it('must have no dice', () => {
      let diceSet = new DiceSet([]);
      expect(diceSet.none()).toBe(true);
    });
  });

  describe('a dice set with dice', () => {
    it('must have dice', () => {
      let diceSet = new DiceSet([{ "number": 1 }, { "number": 2 }]);
      expect(diceSet.none()).toBe(false);
    });

    it('must have no dice that match the callback', () => {
      let diceSet = new DiceSet([{ "number": 1 }, { "number": 2 }]);
      expect(diceSet.none(function(d) { return d.used; })).toBe(true);
    });
  });

  describe('unused', () => {
    it('must return all dice that are not used', () => {
      let diceSet = new DiceSet([{ "number": 1, "used": true }, { "number": 2, "used": false }]);
      expect(diceSet.unused().length()).toEqual(1);
    });
  });

  describe('findByNumber', () => {
    it('must return the die with the specified number', () => {
      let diceSet = new DiceSet([{ "number": 1 }, { "number": 2 }]);
      expect(diceSet.findByNumber(1).number).toEqual(1);
    });
  });

  describe('use', () => {
    it('must mark the die as used', () => {
      let diceSet = new DiceSet([{ "number": 1 }, { "number": 2 }]);
      diceSet.use(1);
      expect(diceSet.findByNumber(1).used).toBe(true);
    });

    describe('when there are some used dice', () => {
      it('must only mark the unused dice', () => {
        let diceSet = new DiceSet([{ "number": 1, "used": true },{ "number": 1, "used": false },{ "number": 1, "used": false },{ "number": 1, "used": false }]);
        diceSet.use(1);
        expect(diceSet.unused().length()).toBe(2);
      });
    });
  });

  describe('highestUnusued', () => {
    it('must find the unused die with the highest number', () => {
      let diceSet = new DiceSet([{ "number": 3, "used": true },{ "number": 2, "used": false }]);
      expect(diceSet.highestUnused()).toBe(2);
    });
  });
});
