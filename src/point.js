import { exists } from './utils'
import Piece from './piece'

/** A point where pieces are placed on */
class Point {
  /**
   * Create a Point
   * @param {Object} args - The properties of the Point.
   * @param {number} args.number - The unique identifier of the point.
   * @param {Object[]} args.pieces - An array of properties of the pieces.
   * @param {boolean} [args.selected=false] - Is the point selected? 
   */
  constructor(args) { 
    /** @member {string} */
    this.constructorName = 'Point';

    /** @member {number} */
    this.number = args.number;

    /** @member {Piece[]} */
    this.pieces = args.pieces.map(function(p) { return new Piece(p); });

    /** @member {boolean} */
    this.selected = args.selected ? true : false;
  }

  /**
   * The point serialized as a simple object.
   * @return {Object}
   */
  get asJson() {
    return {
      number: this.number,
      pieces: this.pieces.map(function(p) { return p.asJson; }),
      selected: this.selected
    };
  }

  // queries

  /**
   * Is the point blocked?
   * @return {boolean}
   */
  get blocked() {
    return this.pieces.length >= 2;
  }

  /**
   * Does the point have a blot?
   * @return {boolean}
   */
  get blot() {
    return this.pieces.length === 1;
  }

  /**
   * Is the point is empty?
   * @return {boolean}
   */
  get empty() {
    return this.pieces.length === 0;
  }

  /**
   * Is the point owned by the player?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  ownedBy(playerNumber) {
    return this.pieces.some(function(p) { return p.playerNumber === playerNumber; });
  }

  /**
   * Is the point owned by the opponent?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  ownedByOpponent(playerNumber) {
    return this.pieces.some(function(p) { return p.playerNumber != playerNumber; });
  }

  /**
   * Is the point a blot owned by the opponent?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  enemyBlot(playerNumber) { 
    return this.blot && this.ownedByOpponent(playerNumber);
  }

  /**
   * Is the point a home point for the player?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  home(playerNumber) { 
    switch (playerNumber) {
      case 1:
        return 19 <= this.number && this.number <= 24;
      case 2:
        return 1 <= this.number && this.number <= 6;
      default: 
        return false;
    }
  }

  /**
   * The distance from the off board for the player.
   * @param {number} playerNumber - The number of the player.
   * @return {(number|null)}
   */
  distanceFromOffBoard(playerNumber) {
    switch (playerNumber) {
      case 1:
        return 25 - this.number;
      case 2:
        return 0 + this.number;
      default: 
        null
    }
  }

  /**
   * The player number of the point.
   * Returns null if the point is empty.
   * @return {(number|null)}
   */
  get playerNumber() {
    let piece = this.pieces[0];
    if (exists(piece)) {
      return piece.playerNumber;
    } else {
      return null;
    }
  }

  // setters 

  /** 
   * Select the point.
   * @return {boolean}
   */
  select() {
    this.selected = true;
    return true;
  }

  /** 
   * Deselect the point.
   * @return {boolean}
   */
  deselect() {
    this.selected = false;
    return true;
  }

  /** 
   * Pop a piece off the point.
   * @return {(Piece|undefined)} 
   */
  pop(_playerNumber) {
    let piece = this.pieces.pop();
    return piece;
  }

  /** 
   * Push a piece on the point.
   * @return {boolean} 
   */
  push(piece) {
    this.pieces.push(piece);
    return true;
  }
};

export default Point
