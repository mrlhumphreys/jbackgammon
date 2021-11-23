import ExtraPoint from './extra_point'

//* The bar where captured pieces go */
class Bar extends ExtraPoint {
  /**
   * Create a bar.
   * @param {Object} args - The properties of the bar.
   * @param {Object[]} args.pieces - An array of properties of the pieces.
   * @param {boolean} [args.selected=false] - Is the bar selected?
   */
  constructor(args) { 
    super(args);
    /** @member {string} */
    this.constructorName = 'Bar';

    /** @member {string} */
    this.number = 'bar';
  }

  // queries

  /**
   * Does the bar have pieces owned by the player?
   * @param {number} playerNumber - The player's number.
   * @return {boolean} The result.
   */
  hasPiecesOwnedByPlayer(playerNumber) { 
    return this.pieces.some(function(p) { return p.playerNumber === playerNumber });
  }

  /**
   * Does the bar have no pieces owned by the player?
   * @param {number} playerNumber - The player's number.
   * @return {boolean} The result.
   */
  noPiecesOwnedByPlayer(playerNumber) { 
    return !this.hasPiecesOwnedByPlayer(playerNumber);
  }

  // setters

  /**
   * Select the bar.
   * @return {boolean} The result.
   */
  select() { 
    this.selected = true;
    return true;
  }

  /**
   * Deselect the bar.
   * @return {boolean} The result.
   */
  deselect() { 
    this.selected = false;
    return true;
  }

  /**
   * Pop a piece from the bar owned by the player.
   * @param {number} playerNumber - The player's number.
   * @return {Piece} The popped piece.
   */
  pop(playerNumber) {
    let piece = this.pieces.find(function(p) { return p.playerNumber === playerNumber; });
    let pieceIndex = this.pieces.findIndex(function(p) { return p.playerNumber === playerNumber; });

    if (pieceIndex !== -1) {
      this.pieces.splice(pieceIndex, 1);
    }
    return piece;
  }
};

export default Bar
