import exists from './exists'
import Piece from './piece'

class ExtraPoint {
  constructor(args) { 
    this.pieces = args.pieces.map(function(p) { return new Piece(p); });
    this.selected = exists(args.selected) ? args.selected : false;
  }

  get asJson() {
    return {
      pieces: this.pieces.map(function(p) { return p.asJson; }),
      selected: this.selected
    };
  }

  // queries

  piecesOwnedByPlayer(playerNumber) { 
    return this.pieces.filter(function(p) { return p.owner === playerNumber });
  }

  // setters

  push(piece) {
    this.pieces.push(piece);
  }
}

export default ExtraPoint 
