import Piece from './piece'

class OffBoard {
  constructor(args) { 
    this.constructorName = 'OffBoard';
    this.number = 'off_board';
    this.pieces = args.pieces.map(function(p) { return new Piece(p) });
    this.selected = args.selected ? args.selected : false
  }

  // queries

  piecesOwnedByPlayer(playerNumber) { 
    return this.pieces.filter(function(p) { return p.owner == playerNumber; });
  }

  enemyBlot(playerNumber) {
    return false;
  }
};

export default OffBoard
