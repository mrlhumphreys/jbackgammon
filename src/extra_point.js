import { exists } from './utils'
import Piece from './piece'

/** Abstract class representing non-standard a Point */
class ExtraPoint {
  /**
   * Create an extra point.
   * @param {Object[]} args - An array of piece properties.
   * @param {boolean} [args.selected=false] - Is the point selected?
   */
  constructor(args) { 
    this.pieces = args.pieces.map(function(p) { return new Piece(p); });
    this.selected = exists(args.selected) ? args.selected : false;
  }

  /**
   * The point serialized as a simple object.
   * @return {Object}
   */
  get asJson() {
    return {
      pieces: this.pieces.map(function(p) { return p.asJson; }),
      selected: this.selected
    };
  }

  // queries

  /**
   * Find pieces owned by player.
   * @param {number} playerNumber - The number of the player.
   * @return {Piece[]}
   */
  piecesOwnedByPlayer(playerNumber) { 
    return this.pieces.filter(function(p) { return p.playerNumber === playerNumber });
  }

  // setters

  /**
   * Push a piece onto the point.
   * @param {Piece} piece - The piece.
   * @return {boolean}
   */
  push(piece) {
    this.pieces.push(piece);
    return true;
  }
}

export default ExtraPoint 
