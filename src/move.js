import exists from './exists'

class Move {
  constructor(args) { 
    this.from = args.from;
    this.to = args.to;
    this.moveList = exists(args.moveList) ? args.moveList.map(function(e) { return e; }) : [];
    this.user = args.user;
    this.playerNumber = args.playerNumber;
    this.gameState = args.gameState;
    this.error = null;
  }

  possible() {
    if (this.from.constructorName === 'Bar') { 
      if (this._noPiecesOwnedByPlayer) {
        this.error = { name: 'NoPiecesError', message: 'There are no pieces on the bar.'};
      } else if (this._noDestinations) {
        this.error = { name: 'BlockedError', message: 'Those pieces cannot move.'};
      } else {
        this.error = null;
      }
    } else {
      if (this._emptyPoint) {
        this.error = { name: 'EmptyPointError', message: 'That point is empty.' };
      } else if (this._ownedByOpponent) {
        this.error = { name: 'PointOwnershipError', message: 'That point is not yours.'};
      } else if (this._barHasPieces) {
        this.error = { name: 'PiecesOnBarError', message: 'There are still pieces on the bar.'};
      } else if (this._noDestinations && (this._somePiecesAreNotHome || this._cannotBearOff)) {
        this.error = { name: 'BlockedError', message: 'Those pieces cannot move.' };
      } else {
        this.error = null;
      }
    }

    return this.error === null;
  }

  valid() {
    if (this.to.constructorName === 'OffBoard') {
      if (this._somePiecesAreNotHome) {
        this.error = { name: 'PiecesNotHomeError', message: 'Cannot bear off while pieces are not home.' };
      } else if (this._diceRollMismatch) {
        this.error = { name: 'DiceMismatchError', message: 'That move does not match the die roll.' };
      } else {
        this.error = null;
      }
    } else {
      if (this._diceRollMismatch) {
        this.error = { name: 'DiceMismatchError', message: 'That move does not match the die roll.' };
      } else if (this._toBlocked) {
        this.error = { name: 'OpponentBlockError', message: 'An opponent is blocking that point.'};
      } else if (this._wrongDirection) {
        this.error = { name: 'WrongDirectionError', message: 'A piece cannot move backwards.'};
      } else {
        this.error = null;
      }
    }

    return this.error === null;
  }

  get dieNumber() {
    if (this.gameState.dice.unused.findByNumber(this._distance)) {
      return this._distance;
    } else {
      return this.gameState.dice.highestUnused();
    }
  }

  get details() {
    return { from: this.from.number, to: this.to.number };
  }

  get complete() {
    return exists(this.from) && exists(this.to) && (this._numberOfMoves === this.gameState.dice.length);
  }

  get allPiecesOffBoard() {
    return this._numberOfMoves === this._numberOfPiecesOnBoard;
  }

  get completeMoveList() { 
    return this.moveList.concat([{from: this.from.number, to: this.to.number}]);
  }

  get _noPiecesOwnedByPlayer() {
    return this.from.noPiecesOwnedByPlayer(this.playerNumber);
  }

  get _noDestinations() {
    return this.gameState.points.destinations(this.from, this.gameState.dice, this.playerNumber).none;
  }

  get _emptyPoint() {
    return exists(this.from) && this.from.empty;
  }

  get _ownedByOpponent() {
    return this.from.ownedByOpponent(this.playerNumber);
  }

  get _barHasPieces() {
    return this.gameState.bar.pieces.some((p) => { return p.owner === this.playerNumber; });
  }

  get _noDestinations() {
    return this.gameState.points.destinations(this.from, this.gameState.dice, this.playerNumber).none;
  }

  get _somePiecesAreNotHome() {
    return this.gameState.points.somePiecesNotHome(this.playerNumber);
  }

  get _cannotBearOff() {
    let backPointNumber = this.gameState.points.backPointForPlayer(this.playerNumber).number;

    if (backPointNumber === this.from.number) {
      return this.gameState.dice.unused.filter((d) => {
        return this.from.distanceFromOffBoard(this.playerNumber) <= d.number;
      }).none();
    } else {
      return this.gameState.dice.unused.filter((d) => {
        return this.from.distanceFromOffBoard(this.playerNumber) === d.number;
      }).none();
    }
  }

  get _diceRollMismatch() {
    return this.gameState.dice.unused.none((d) => {
      if (this._bearOff) {
        return d.number >= this._distance;
      } else {
        return d.number === this._distance;
      }
    });
  }

  get _bearOff() {
    return this.to.constructorName === 'OffBoard';
  }

  get _toBlocked() { 
    return this.to.ownedByOpponent(this.playerNumber) && this.to.blocked;
  }

  get _wrongDirection() {
    let vectorDistance = this.to.number - this.from.number;
    switch (this.playerNumber) {
      case 1:
        return (vectorDistance < 0);
      case 2:
        return (vectorDistance > 0);
      default: 
        return false;
    }
  }

  get _distance() {
    return Math.abs(this._toNumber - this._fromNumber);
  }

  get _fromNumber() {
    switch (this.playerNumber) {
      case 1:
        return this.from.constructorName === 'Bar' ? 0 : this.from.number;
      case 2:
        return this.from.constructorName === 'Bar' ? 25 : this.from.number;
      default: 
        return null;
    }
  }

  get _toNumber() {
    switch (this.playerNumber) {
      case 1:
        return this.to.constructorName === 'OffBoard' ? 25 : this.to.number;
      case 2:
        return this.to.constructorName === 'OffBoard' ? 0 : this.to.number;
      default: 
        return null;
    }
  }

  get _numberOfMoves() {
    // add one to count for the proposed move (from, to)
    return this.moveList.length + 1;
  }

  get _numberOfPiecesOnBoard() {
    return 15 - this.gameState.offBoard.piecesOwnedByPlayer(this.playerNumber).length;
  }
};

export default Move
