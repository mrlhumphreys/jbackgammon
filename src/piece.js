//* A piece on a backgammon board */
class Piece {
  /**
   * Create a piece.
   * @param {Object} args - The properties of the piece.
   * @param {number} args.id - The unique identifier of the piece.
   * @param {number} args.owner - The owner of the piece. 
   */
  constructor(args) {
    /** @member {number} */
    this.id = args.id

    /** @member {number} */
    this.owner = args.owner
  }

  /**
   * The piece serialized as a simple object.
   * @return {Object}
   */
  get asJson() {
    return {
      id: this.id,
      owner: this.owner
    };
  }
};

export default Piece
