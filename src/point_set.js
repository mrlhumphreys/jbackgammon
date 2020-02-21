import { exists } from './utils'
import Point from './point'

/** A collection of points */
class PointSet {
  /**
   * Create a point set.
   * @param {Object[]} args - An array of point properties.
   */
  constructor(points) {
    /** @member {Point[]} */
    this.points = points.map(function(p) { return new Point(p); });
  }

  /**
   * The Point set serialized as an array of point properties.
   * @return {Object[]}
   */
  get asJson() {
    return this.points.map(function(p) { return p.asJson; });
  }

  // enumerable functions

  /**
   * Find out of every element satisfies callback function
   * @param {Function} callback - The callback function containing the condition.
   * @return {boolean}
   */
  every(callback) { 
    return this.points.every(callback);
  }

  /**
   * Find out if some element satsifies the callback function
   * Without a callback, it checks if there is at least one point.
   * @param {Function} [callback] - The callback function containing the condition.
   * @return {boolean}
   */
  some(callback) { 
    if (exists(callback)) {
      return this.points.some(callback);
    } else {
      return this.points.length > 0;
    }
  }

  /**
   * Are there no points in the set?
   * @return {boolean}
   */
  get none() {
    return this.points.length === 0;
  }

  /**
   * Sort the set by number.
   * @return {PointSet}
   */
  get sort() {
    let sorted = this.points.sort(function(a, b) {
      if (a.number > b.number) {
        return 1;
      } else if (a.number < b.number) {
        return -1;
      } else {
        return 0;
      } 
    });
    return new PointSet(sorted);
  }

  /**
   * Find the first point.
   * Return undefined if no points in the set.
   * @return {(Point|undefined)
   */
  get first() {
    return this.points[0];
  }

  /**
   * Find the last point.
   * Return undefined if no points in the set.
   * @return {(Point|undefined)
   */
  get last() {
    return this.points.slice(-1)[0];
  }

  /**
   * Does the set include the point?
   * @param {Point} point - The point.
   * @return {boolean}
   */
  includes(point) {
    return this.some(function(p) { return p.number === point.number; });
  }

  // scopes

  /**
   * The destinations from a point using dice for a player. 
   * @param {Point} from - The origin point.
   * @param {DiceSet} dice - The dice set.
   * @param {number} playerNumber - The player number.
   * @return {PointSet}
   */
  destinations(from, dice, playerNumber)  {
    let inRange = dice.unused.map((d) => { 
      return this.destination(from, d, playerNumber); 
    }).filter(function(e) { 
      return e; 
    });

    let possible = inRange.filter(function(p) { 
      return p.empty || p.ownedBy(playerNumber) || p.enemyBlot(playerNumber);
    });

    return new PointSet(possible);
  }

  /**
   * Filter all points owned by the player.
   * @param {number} playerNumber - The number of the player.
   * @return {PointSet}
   */
  ownedByPlayer(playerNumber) { 
    return new PointSet(this.points.filter(function(p) { return p.ownedBy(playerNumber); }));
  }

  // queries

  /**
   * Find point by number.
   * Return undefined if it can't be found.
   * @param {number} number - The identifier of the point.
   * @return {(Point|undefined)}
   */
  findByNumber(number) { 
    return this.points.filter(function(p) { return p.number === number; })[0];
  }

  /**
   * The destination from a point using a die for a player. 
   * @param {Point} from - The origin point.
   * @param {Die} die - The die.
   * @param {number} playerNumber - The player number.
   * @return {(Point|null)}
   */
  destination(from, die, playerNumber) { 
    let fromNumber = undefined;

    switch (playerNumber) {
      case 1:
        fromNumber = (from.constructorName === 'Bar') ? 0 : from.number;
        return this.findByNumber(fromNumber + die.number);
      case 2:
        fromNumber = (from.constructorName === 'Bar') ? 25 : from.number;
        return this.findByNumber(fromNumber - die.number);
      default: 
        return null;
    }
  }

  /**
   * Find the back point for a player.
   * @param {number} playerNumber - The number of the player.
   * @return {(point|null)}
   */
  backPointForPlayer(playerNumber) { 
    switch (playerNumber) {
      case 1:
        return this.ownedByPlayer(playerNumber).sort.first;
      case 2:
        return this.ownedByPlayer(playerNumber).sort.last;
      default: 
        return null;
    }
  }

  /**
   * Are there pieces not home for the player?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  somePiecesNotHome(playerNumber) { 
    return this.ownedByPlayer(playerNumber).some(function(p) { return !p.home(playerNumber); });
  }

  /**
   * Is the player unable to bear points off with dice?
   * @param {number} playerNumber - The number of the player.
   * @param {DiceSet} dice - The dice set.
   * @return {boolean}
   */
  cannotBearOff(playerNumber, dice) { 
    return this.ownedByPlayer(playerNumber).every((p) => {
      let distance = p.distanceFromOffBoard(playerNumber);
      if (this.backPointForPlayer(playerNumber).number === p.number) {
        return dice.unused.greaterThanOrEqualTo(distance).none();
      } else {
        return dice.unused.equalTo(distance).none();
      }
    });
  }

  /**
   * The selected point.
   * @return {(Point|undefined)}
   */
  get selected() {
    return this.points.filter(function(p) { return p.selected; })[0];
  }

  // setters 

  /**
   * Deselct all pieces.
   * @return {boolean}
   */
  deselect() {
    return this.points.filter(function(p) {
      return p.selected;
    }).map(function(p) {
      return p.deselect();
    });
    return true;
  }

};
export default PointSet
