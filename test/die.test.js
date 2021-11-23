import Die from '../src/die'

describe('Die', () => {
  describe('initalising a die', () => {
    it('must set the number and id', () => {
      let die = new Die({number: 1, id: 1});
      expect(die.id).toEqual(1);
      expect(die.number).toEqual(1);
    });
  });

  describe('asJson', () => {
    it('must return the die as json', () => {
      let die = new Die({number: 1, id: 1});
      expect(die.asJson).toEqual({ id: 1, number: 1, used: false });
    });
  });

  describe('use', () => {
    it('must mark the die as used', () => {
      let die = new Die({number: 1});
      die.use();
      expect(die.used).toBe(true);
    });
  });

  describe('roll', () => {
    it('must set the number of the die', () => {
      let die = new Die({number: null});
      die.roll(); 
      expect(die.number).toBeGreaterThanOrEqual(1);
      expect(die.number).toBeLessThanOrEqual(6);
    });
  });
});
