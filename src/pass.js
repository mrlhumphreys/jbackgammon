import { exists } from './utils'

/** A pass action */
class Pass {
  /**
   * Create a pass action
   * @param {Object} args - The properties of the pass.
   * @param {number} args.playerNumber - The number of the player.
   * @param {Match} args.match - The match being played.
   */
  constructor(args) {
    /** @member {number} */
    this.playerNumber = args.playerNumber;

    /** @member {Match} */
    this.match = args.match;
  }

  /**
   * The result of passing
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

    if (this.match.gameState.rollPhase) {
      return { name: 'RollPhase', message: 'Pieces cannot move until the dice are rolled.' };
    }

    if (!this.match.gameState.noMovesForPlayer(this.playerNumber)) {
      return { name: 'MovesAvailable', message: 'A move can still be made.' };
    }

    if (this.match.gameState.dice.unused.length == 0) {
      return { name: 'AllDiceUsed', message: 'All dice have been used.' };
    }

    return { name: 'PassValid', message: '' };
  }
}

export default Pass

