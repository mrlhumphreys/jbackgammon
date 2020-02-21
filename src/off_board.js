import ExtraPoint from './extra_point'

//* The off board where pieces at the end go */
class OffBoard extends ExtraPoint {
  /**
   * Create an off board.
   * @param {Object} args - The properties of the off board.
   * @param {Object[]} args.pieces - An array of properties of the pieces.
   */
  constructor(args) { 
    super(args);
    /** @member {string} */
    this.constructorName = 'OffBoard';

    /** @member {string} */
    this.number = 'off_board';
  }

  // queries

  /**
   * Does off board have an empty blot?
   * Always returns false.
   * @param {number} _playerNumber - The number of the player.
   * @return {boolean}
   */
  enemyBlot(_playerNumber) {
    return false;
  }

  /**
   * Are all of the player's pieces off board?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  hasAllOfPlayersPieces(playerNumber) {
    return (this.piecesOwnedByPlayer(playerNumber).length == 15);
  }
};

export default OffBoard
