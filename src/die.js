import { exists } from './utils'

//* A die with six sides than can be rolled */
class Die {
  /**
   * Create a Die
   * @param {Object} args - The properties of the die.
   * @param {number} args.id - The unique identifier of the die.
   * @param {number} args.number - The number rolled.
   * @param {boolean} [args.used=false] - Has the die been used?
   */
  constructor(args) {
    /** @member {number} */
    this.id = args.id;

    /** @member {number} */
    this.number = args.number;

    /** @member {boolean} */
    this.used = exists(args.used) ? args.used : false;
  }

  /**
   * The die serialized as a simple object. 
   * @return {Object}
   */
  get asJson() {
    return {
      id: this.id,
      number: this.number,
      used: this.used
    };
  }

  // setters

  /**
   * Mark the die as used.
   * @return {boolean}
   */
  use() {
    this.used = true;
    return true;
  }
};

export default Die
