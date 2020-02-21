import { exists } from './utils'
import Die from './die'

/** A collection of dice */
class DiceSet {
  /**
   * Create a dice set.
   * @param {Object[]} args - An array of dice properties. 
   */
  constructor(dice) { 
    /** @member {Die[]} */
    this.dice = dice.map(function(d) { return new Die(d); });
  }

  /**
   * The dice set serialized as an array of dice properties.
   * @return {Object[]}
   */
  get asJson() {
    return this.dice.map(function(d) { return d.asJson; });
  }

  // enumerable

  /**
   * The number of dice in the set.
   * @return {number} 
   */
  get length() { 
    return this.dice.length;
  }

  /**
   * Filter the dice based on a callback function
   * @param {Function} callback - The callback filter function.
   * @return {DiceSet}
   */
  filter(callback) { 
    return new DiceSet(this.dice.filter(callback));
  }

  /**
   * Map the dice set into something else based on a callback function.
   * @param {Function} callback - The callback map function.
   * @return {Object[]}
   */
  map(callback) { 
    return this.dice.map(callback);
  }

  /**
   * Are there no dice matching the callback function?
   * If no callback function specified, 
   * return the result of comparing length with 0.
   * @param {Function} [callback] - The callback filter function.
   * @return {boolean}
   */
  none(callback) { 
    if (exists(callback)) {
      return this.filter(callback).none();
    } else {
      return this.dice.length === 0;
    }
  }

  // queries

  /**
   * Get unused dice.
   * @return {DiceSet}
   */
  get unused() {
    return this.filter(function(d) { return !d.used; });
  }

  /**
   * Find the dice matching the number.
   * @param {number} number - The number of the dice.
   * @return {die}
   */
  findByNumber(number) { 
    return this.dice.filter(function(d) { return d.number === number; })[0];
  }

  /**
   * Find the highest unused matching the number.
   * @param {number} number - The number of the dice.
   * @return {Die}
   */
  highestUnused(number) { 
    return Math.max.apply(null, this.dice.map(function(d) { return !d.used && d.number; }));
  }

  /**
   * Find dice by number
   * @param {number} number - The number of the dice.
   * @return {DiceSet}
   */
  equalTo(number) {
    return this.filter(function(d) { return d.number === number; });
  } 

  /**
   * Find dice greater than or equal to number
   * @param {number} number - The number of the dice.
   * @return {DiceSet}
   */
  greaterThanOrEqualTo(number) {
    return this.filter(function(d) { return d.number >= number; });
  }

  // actions

  /**
   * Use dice matching number.
   * @param {number} number - The number of the die. 
   * @return {boolean}
   */
  use(number) { 
    this.dice.filter(function(d) { return !d.used && (d.number === number); })[0].use();
    return true;
  }
};

export default DiceSet
