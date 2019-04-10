import ExtraPoint from './extra_point'

class Bar extends ExtraPoint {
  constructor(args) { 
    super(args);
    this.constructorName = 'Bar';
    this.number = 'bar';
  }

  // queries

  hasPiecesOwnedByPlayer(playerNumber) { 
    return this.pieces.some(function(p) { return p.owner === playerNumber });
  }

  noPiecesOwnedByPlayer(playerNumber) { 
    return !this.hasPiecesOwnedByPlayer(playerNumber);
  }

  // setters

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
};

export default Bar
