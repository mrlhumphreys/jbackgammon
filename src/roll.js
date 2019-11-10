import { exists } from './utils'

class Roll {
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

    if (this.match.gameState.movePhase) {
      return { name: 'MovePhase', message: 'Dice have already been rolled.' };
    }

    return { name: 'RollValid', message: '' };
  }
}

export default Roll 
