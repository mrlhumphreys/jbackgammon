import ExtraPoint from './extra_point'

class OffBoard extends ExtraPoint {
  constructor(args) { 
    super(args);
    this.constructorName = 'OffBoard';
    this.number = 'off_board';
  }

  // queries

  enemyBlot(playerNumber) {
    return false;
  }
};

export default OffBoard
