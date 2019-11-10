import { exists } from './utils'

class Pass {
  constructor(args) {
    this.playerNumber = args.playerNumber;
    this.match = args.match;
  }

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
