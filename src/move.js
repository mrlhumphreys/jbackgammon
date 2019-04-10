import exists from './exists'

class Move {
  constructor(args) { 
    this.fromNumber = args.fromNumber;
    this.toNumber = args.toNumber;
    this.moveList = exists(args.moveList) ? args.moveList.map(function(e) { return e; }) : [];
    this.playerNumber = args.playerNumber;
    this.gameState = args.gameState;
    this.error = null;
  }

  possible() {
    if (this.fromNumber === 'bar') { 
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
    if (this.toNumber === 'off_board') {
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
    return { from: this.fromNumber, to: this.toNumber };
  }

  get complete() {
    return exists(this._from) && exists(this._to) && (this._numberOfMoves === this.gameState.dice.length);
  }

  get allPiecesOffBoard() {
    return this._numberOfMoves === this._numberOfPiecesOnBoard;
  }

  get completeMoveList() { 
    return this.moveList.concat([{from: this.fromNumber, to: this.toNumber}]);
  }

  get _from() {
    return this.gameState.findPoint(this.fromNumber);
  }

  get _to() {
    return this.gameState.findPoint(this.toNumber);
  }

  get _noPiecesOwnedByPlayer() {
    return this._from.noPiecesOwnedByPlayer(this.playerNumber);
  }

  get _emptyPoint() {
    return exists(this._from) && this._from.empty;
  }

  get _ownedByOpponent() {
    return this._from.ownedByOpponent(this.playerNumber);
  }

  get _barHasPieces() {
    return this.gameState.bar.pieces.some((p) => { return p.owner === this.playerNumber; });
  }

  get _noDestinations() {
    return this.gameState.points.destinations(this._from, this.gameState.dice, this.playerNumber).none;
  }

  get _somePiecesAreNotHome() {
    return this.gameState.points.somePiecesNotHome(this.playerNumber);
  }

  get _cannotBearOff() {
    let backPointNumber = this.gameState.points.backPointForPlayer(this.playerNumber).number;
    let distance = this._from.distanceFromOffBoard(this.playerNumber);
    if (backPointNumber === this._from.number) {
      return this.gameState.dice.unused.greaterThanOrEqualTo(distance).none();
    } else {
      return this.gameState.dice.unused.equalTo(distance).none();
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
    return this.toNumber === 'OffBoard';
  }

  get _toBlocked() { 
    return this._to.ownedByOpponent(this.playerNumber) && this._to.blocked;
  }

  get _wrongDirection() {
    let vectorDistance = this._toInt - this._fromInt;
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
    return Math.abs(this._toInt - this._fromInt);
  }

  get _fromInt() {
    switch (this.playerNumber) {
      case 1:
        return this.fromNumber === 'bar' ? 0 : this.fromNumber;
      case 2:
        return this.fromNumber === 'bar' ? 25 : this.fromNumber;
      default: 
        return null;
    }
  }

  get _toInt() {
    switch (this.playerNumber) {
      case 1:
        return this.toNumber === 'off_board' ? 25 : this.toNumber;
      case 2:
        return this.toNumber === 'off_board' ? 0 : this.toNumber;
o
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
