import exists from './exists'
import Piece from './piece'

class Bar {
  constructor(args) { 
    this.constructorName = 'Bar';
    this.number = 'bar';
    this.pieces = args.pieces.map(function(p) { return new Piece(p); });
    this.selected = exists(args.selected) ? args.selected : false;
  }

  asJson() {
    return {
      pieces: this.pieces.map(function(p) { return p.asJson(); }),
      selected: this.selected
    };
  }

  // queries

  piecesOwnedByPlayer(playerNumber) { 
    return this.pieces.filter(function(p) { return p.owner == playerNumber });
  }

  hasPiecesOwnedByPlayer(playerNumber) { 
    return this.pieces.some(function(p) { return p.owner == playerNumber });
  }

  noPiecesOwnedByPlayer(playerNumber) { 
    return !this.hasPiecesOwnedByPlayer(playerNumber);
  }

  // modifiers

  select() { 
    this.selected = true;
  }

  deselect() { 
    this.selected = false;
  }

  pop(playerNumber) {
    let piece = this.pieces.find(function(p) { return p.owner === playerNumber; });
    let pieceIndex = this.pieces.findIndex(function(p) { return p.owner === playerNumber; });

    if (pieceIndex !== -1) {
      this.pieces.splice(pieceIndex, 1);
    }
    return piece;
  }

  push(piece) {
    this.pieces.push(piece);
  }
};

export default Bar
