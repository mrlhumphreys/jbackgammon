//* A piece on a backgammon board */
class Piece {
  /**
   * Create a piece.
   * @param {Object} args - The properties of the piece.
   * @param {number} args.id - The unique identifier of the piece.
   * @param {number} args.player_number - The player number of the piece. 
   */
  constructor(args) {
    /** @member {number} */
    this.id = args.id

    /** @member {number} */
    this.playerNumber = args.player_number
  }

  /**
   * The piece serialized as a simple object.
   * @return {Object}
   */
  get asJson() {
    return {
      id: this.id,
      player_number: this.playerNumber
    };
  }
};

export default Piece
