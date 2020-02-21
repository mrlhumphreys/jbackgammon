import { exists } from './utils'

/** A roll action */
class Roll {
  /**
   * Create a roll action.
   * @param {Object} args - The properties of a roll.
   * @param {number} playerNumber - The number of the player.
   * @param {Match} match - The match being played.
   */
  constructor(args) {
    /** @member {number} */
    this.playerNumber = args.playerNumber;

    /** @member {Match} */
    this.match = args.match;
  }

  /**
   * The result of the roll.
   * Returns an object with name and message.
   * @return {Object}
   */
  get result() {
    if (exists(this.match.winner)) {
      return { name: 'GameOver', message: 'Game is over.' };
    }

    if (!this.match.gameState.playersTurn(this.playerNumber)) {
      return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
    }

    if (this.match.gameState.movePhase) {
      return { name: 'MovePhase', message: 'Dice have already been rolled.' };
    }

    return { name: 'RollValid', message: '' };
  }
}

export default Roll 
