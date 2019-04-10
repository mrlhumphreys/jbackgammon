import exists from './exists'
import Die from './die'

class DiceSet {
  constructor(dice) { 
    this.dice = dice.map(function(d) { return new Die(d); });
  }

  get asJson() {
    return this.dice.map(function(d) { return d.asJson; });
  }

  // enumerable

  get length() { 
    return this.dice.length;
  }

  filter(callback) { 
    return new DiceSet(this.dice.filter(callback));
  }

  map(callback) { 
    return this.dice.map(callback);
  }

  none(callback) { 
    if (exists(callback)) {
      return this.filter(callback).none();
    } else {
      return this.dice.length === 0;
    }
  }

  // queries

  get unused() {
    return this.filter(function(d) { return !d.used; });
  }

  findByNumber(number) { 
    return this.dice.filter(function(d) { return d.number === number; })[0];
  }

  highestUnused(number) { 
    return Math.max.apply(null, this.dice.map(function(d) { return !d.used && d.number; }));
  }

  equalTo(number) {
    return this.filter(function(d) { return d.number === number; });
  } 

  greaterThanOrEqualTo(number) {
    return this.filter(function(d) { return d.number >= number; });
  }

  // actions

  use(number) { 
    this.dice.filter(function(d) { return !d.used && (d.number === number); })[0].use();
  }
};

export default DiceSet
