import exists from './exists'

class Move {
  constructor(args) { 
    this.from = args.from;
    this.to = args.to;
    this.moveList = args.moveList;
    this.user = args.user;
    this.gameState = args.gameState;
    this.error = null;
  }

  possible() {
    if (this.from.constructorName == 'Bar') { 
      if (this._noPiecesOwnedByPlayer()) {
        this.error = { name: 'NoPiecesError', message: 'There are no pieces on the bar.'};
      } else if (this._noDestinations()) {
        this.error = { name: 'BlockedError', message: 'Those pieces cannot move.'};
      } else {
        this.error = null;
      }
    } else {
      if (this._emptyPoint()) {
        this.error = { name: 'EmptyPointError', message: 'That point is empty.' };
      } else if (this._ownedByOpponent()) {
        this.error = { name: 'PointOwnershipError', message: 'That point is not yours.'};
      } else if (this._barHasPieces()) {
        this.error = { name: 'PiecesOnBarError', message: 'There are still pieces on the bar.'};
      } else if (this._noDestinations() && (this._somePiecesAreNotHome() || this._cannotBearOff())) {
        this.error = { name: 'BlockedError', message: 'Those pieces cannot move.' };
      } else {
        this.error = null;
      }
    }

    return this.error == null;
  }

  valid() {
    if (this.to.constructorName == 'OffBoard') {
      if (this._somePiecesAreNotHome()) {
        this.error = { name: 'PiecesNotHomeError', message: 'Cannot bear off while pieces are not home.' };
      } else if (this._diceRollMismatch()) {
        this.error = { name: 'DiceMismatchError', message: 'That move does not match the die roll.' };
      } else {
        this.error = null;
      }
    } else {
      if (this._diceRollMismatch()) {
        this.error = { name: 'DiceMismatchError', message: 'That move does not match the die roll.' };
      } else if (this._toBlocked()) {
        this.error = { name: 'OpponentBlockError', message: 'An opponent is blocking that point.'};
      } else if (this._wrongDirection()) {
        this.error = { name: 'WrongDirectionError', message: 'A piece cannot move backwards.'};
      } else {
        this.error = null;
      }
    }

    return this.error == null;
  }

  dieNumber() {
    if (this.gameState.dice.unused().findByNumber(this._distance())) {
      return this._distance();
    } else {
      return this.gameState.dice.highestUnused();
    }
  }

  details() {
    return { from: this.from.number, to: this.to.number };
  }

  complete() {
    return exists(this.from) && exists(this.to) && (this._numberOfMoves() == this.gameState.dice.length());
  }

  allPiecesOffBoard() {
    return this._numberOfMoves() == this._numberOfPiecesOnBoard();
  }

  completeMoveList() { 
    return this.moveList.concat([{from: this.from.number, to: this.to.number}]);
  }

  _noPiecesOwnedByPlayer() {
    return this.from.noPiecesOwnedByPlayer(this.user.playerNumber);
  }

  _noDestinations() {
    return this.gameState.points.destinations(this.from, this.gameState.dice, this.user.playerNumber).none();
  }

  _emptyPoint() {
    return exists(this.from) && this.from.empty();
  }

  _ownedByOpponent() {
    return this.from.ownedByOpponent(this.user.playerNumber);
  }

  _barHasPieces() {
    return this.gameState.bar.pieces.some((p) => { return p.owner == this.user.playerNumber; });
  }

  _noDestinations() {
    return this.gameState.points.destinations(this.from, this.gameState.dice, this.user.playerNumber).none();
  }

  _somePiecesAreNotHome() {
    return this.gameState.points.somePiecesNotHome(this.user.playerNumber);
  }

  _cannotBearOff() {
    let backPointNumber = this.gameState.points.backPointForPlayer(this.user.playerNumber).number;

    if (backPointNumber == this.from.number) {
      return this.gameState.dice.unused().filter((d) => {
        return this.from.distanceFromOffBoard(this.user.playerNumber) <= d.number;
      }).none();
    } else {
      return this.gameState.dice.unused().filter((d) => {
        return this.from.distanceFromOffBoard(this.user.playerNumber) == d.number;
      }).none()
    }
  }

  _diceRollMismatch() {
    return this.gameState.dice.unused().none((d) => {
      if (this._bearOff()) {
        return d.number >= this._distance();
      } else {
        return d.number == this._distance();
      }
    });
  }

  _bearOff() {
    return this.to.constructorName == 'OffBoard';
  }

  _toBlocked() { 
    return this.to.ownedByOpponent(this.user.playerNumber) && this.to.blocked();
  }

  _wrongDirection() {
    let vectorDistance = this.to.number - this.from.number;
    switch (this.user.playerNumber) {
      case 1:
        return (vectorDistance < 0);
      case 2:
        return (vectorDistance > 0);
      default: 
        return false;
    }
  }

  _distance() {
    return Math.abs(this._toNumber() - this._fromNumber());
  }

  _fromNumber() {
    switch (this.user.playerNumber) {
      case 1:
        return this.from.constructorName == 'Bar' ? 0 : this.from.number;
      case 2:
        return this.from.constructorName == 'Bar' ? 25 : this.from.number;
      default: 
        return null;
    }
  }

  _toNumber() {
    switch (this.user.playerNumber) {
      case 1:
        return this.to.constructorName == 'OffBoard' ? 25 : this.to.number;
      case 2:
        return this.to.constructorName == 'OffBoard' ? 0 : this.to.number;
      default: 
        return null;
    }
  }

  _numberOfMoves() {
    return this.moveList.length + 1;
  }

  _numberOfPiecesOnBoard() {
    return 15 - this.gameState.offBoard.piecesOwnedByPlayer(this.user.playerNumber).length;
  }
};

export default Move
