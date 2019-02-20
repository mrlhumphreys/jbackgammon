import Piece from './piece'

class Bar {
  constructor(args) { 
    this.constructorName = 'Bar';
    this.number = 'bar';
    this.pieces = args.pieces.map(function(p) { return new Piece(p); });
    this.selected = args.selected ? args.selected : false;
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
};

export default Bar
