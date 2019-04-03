import Die from '../src/die'

describe('Die', () => {
  describe('initalising a die', () => {
    it('must set the number', () => {
      let die = new Die({number: 1});
      expect(die.number).toEqual(1);
    });
  });

  describe('asJson', () => {
    it('must return the die as json', () => {
      let die = new Die({number: 1});
      expect(die.asJson()).toEqual({ number: 1, used: false });
    });
  });

  describe('use', () => {
    it('must mark the die as used', () => {
      let die = new Die({number: 1});
      die.use();
      expect(die.used).toBe(true);
    });
  });
});
