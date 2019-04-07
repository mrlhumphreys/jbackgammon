import exists from './exists'
import Point from './point'

class PointSet {
  constructor(points) {
    this.points = points.map(function(p) { return new Point(p); });
  }

  get asJson() {
    return this.points.map(function(p) { return p.asJson; });
  }

  // enumerable functions

  every(callback) { 
    return this.points.every(callback);
  }

  some(callback) { 
    if (exists(callback)) {
      return this.points.some(callback);
    } else {
      return this.points.length > 0;
    }
  }

  get none() {
    return this.points.length === 0;
  }

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

  get first() {
    return this.points[0];
  }

  get last() {
    return this.points.slice(-1)[0];
  }

  includes(point) {
    return this.some(function(p) { return p.number === point.number; });
  }

  // scopes

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

  ownedByPlayer(playerNumber) { 
    return new PointSet(this.points.filter(function(p) { return p.ownedBy(playerNumber); }));
  }

  // queries

  findByNumber(number) { 
    return this.points.filter(function(p) { return p.number === number; })[0];
  }

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

  somePiecesNotHome(playerNumber) { 
    return this.ownedByPlayer(playerNumber).some(function(p) { return !p.home(playerNumber); });
  }

  cannotBearOff(playerNumber, dice) { 
    return this.ownedByPlayer(playerNumber).every((p) => {
      if (this.backPointForPlayer(playerNumber).number === p.number) {
        return dice.unused.filter((d) => { 
          return p.distanceFromOffBoard(playerNumber) <= d.number;
        }).none();
      } else {
        return dice.unused.filter((d) => {
          return p.distanceFromOffBoard(playerNumber) === d.number;
        }).none();
      }
    });
  }

  get selected() {
    return this.points.filter(function(p) { return p.selected; })[0];
  }

  // setters 

  deselect() {
    return this.points.filter(function(p) {
      return p.selected;
    }).map(function(p) {
      return p.deselect();
    });
  }

};
export default PointSet
