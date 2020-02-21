import { exists } from './utils'

/** A move */
class Move {
  /**
   * Create a move.
   * @param {number} args - The properties of a move.
   * @param {number} args.touchedPointNumber - The number of the touched point.
   * @param {Match} args.match - The match the move is being played.
   */
  constructor(args) { 
    /** @member {number} */
    this.touchedPointNumber = args.touchedPointNumber;

    /** @member {number} */
    this.playerNumber = args.playerNumber;

    /** @member {Match} */
    this.match = args.match;
  }

  /**
   * The result of the move.
   * Returns an object with name and message properties.
   * @return {Object}
   */
  get result() {
    if (exists(this.match.winner)) {
      return { name: 'GameOver', message: 'Game is over.' };
    }
    
    if (!this.match.gameState.playersTurn(this.playerNumber)) {
      return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
    }

    if (this.match.gameState.rollPhase) {
      return { name: 'RollPhase', message: 'Pieces cannot move until the dice are rolled.' };
    }

    if (exists(this.match.gameState.selectedPoint)) {
      return this._selectedResult;
    } else {
      return this._unselectedResult;
    }
  }

  get _selectedResult() {
    if (this.touchedPointNumber === 'off_board') {
      if (this._somePiecesAreNotHome) {
        return { name: 'PiecesNotHome', message: 'Cannot bear off while pieces are not home.' };
      } else if (this._diceRollMismatch) {
        return { name: 'DiceMismatch', message: 'That move does not match the die roll.' };
      } else if (this._complete || this._allPiecesOffBoard) {
        return { name: 'MoveComplete', message: '' };
      } else {
        return { name: 'MoveIncomplete', message: '' };
      }
    } else {
      if (this._diceRollMismatch) {
        return { name: 'DiceMismatch', message: 'That move does not match the die roll.' };
      } else if (this._toBlocked) {
        return { name: 'OpponentBlock', message: 'An opponent is blocking that point.'};
      } else if (this._wrongDirection) {
        return { name: 'WrongDirection', message: 'A piece cannot move backwards.'};
      } else if (this._complete) {
        return { name: 'MoveComplete', message: '' };
      } else {
        return { name: 'MoveIncomplete', message: '' };
      }
    }
  }

  get _unselectedResult() {
    if (this.touchedPointNumber === 'bar') { 
      if (this._noPiecesOwnedByPlayer) {
        return { name: 'NoPieces', message: 'There are no pieces on the bar.' };
      } else if (this._noDestinations) {
        return { name: 'Blocked', message: 'Those pieces cannot move.' };
      } else {
        return { name: 'MovePossible', message: '' };
      }
    } else {
      if (this._emptyPoint) {
        return { name: 'EmptyPoint', message: 'That point is empty.' };
      } else if (this._ownedByOpponent) {
        return { name: 'PointOwnershipMismatch', message: 'That point is not yours.' };
      } else if (this._barHasPieces) {
        return { name: 'PiecesOnBar', message: 'There are still pieces on the bar.' };
      } else if (this._noDestinations && (this._somePiecesAreNotHome || this._cannotBearOff)) {
        return { name: 'Blocked', message: 'Those pieces cannot move.' };  
      } else { 
        return { name: 'MovePossible', message: '' };
      }
    }
  }

  /**
   * The number of the die based on the move.
   * @return {number}
   */
  get dieNumber() {
    if (this.match.gameState.dice.unused.findByNumber(this._distance)) {
      return this._distance;
    } else {
      return this.match.gameState.dice.highestUnused();
    }
  }

  /** 
   * The details of the move.
   * Returns an object with from and to point numbers.
   * @return {Object}
   */
  get details() {
    return { from: this._selectedPoint.number, to: this.touchedPointNumber };
  }

  get _complete() {
    return exists(this._selectedPoint) && exists(this._touchedPoint) && (this._numberOfMoves === this.match.gameState.dice.length);
  }

  get _allPiecesOffBoard() {
    return this._numberOfMoves === this._numberOfPiecesOnBoard;
  }

  get completeMoveList() { 
    return this.match.moveList.concat([{from: this._selectedPoint.number, to: this.touchedPointNumber}]);
  }

  get _selectedPoint() {
    return this.match.gameState.selectedPoint;
  }

  get _touchedPoint() {
    return this.match.gameState.findPoint(this.touchedPointNumber);
  }

  get _to() {
    return this.match.gameState.findPoint(this.touchedPointNumber);
  }

  get _noPiecesOwnedByPlayer() {
    return this._touchedPoint.noPiecesOwnedByPlayer(this.playerNumber);
  }

  get _emptyPoint() {
    return exists(this._touchedPoint) && this._touchedPoint.empty;
  }

  get _ownedByOpponent() {
    return this._touchedPoint.ownedByOpponent(this.playerNumber);
  }

  get _barHasPieces() {
    return this.match.gameState.bar.pieces.some((p) => { return p.owner === this.playerNumber; });
  }

  get _noDestinations() {
    return this.match.gameState.points.destinations(this._touchedPoint, this.match.gameState.dice, this.playerNumber).none;
  }

  get _somePiecesAreNotHome() {
    return this.match.gameState.points.somePiecesNotHome(this.playerNumber);
  }

  get _cannotBearOff() {
    let backPointNumber = this.match.gameState.points.backPointForPlayer(this.playerNumber).number;
    let distance = this._touchedPoint.distanceFromOffBoard(this.playerNumber);
    if (backPointNumber === this.touchedPointNumber) {
      return this.match.gameState.dice.unused.greaterThanOrEqualTo(distance).none();
    } else {
      return this.match.gameState.dice.unused.equalTo(distance).none();
    }
  }

  get _diceRollMismatch() {
    return this.match.gameState.dice.unused.none((d) => {
      if (this._bearOff) {
        return d.number >= this._distance;
      } else {
        return d.number === this._distance;
      }
    });
  }

  get _bearOff() {
    return this.touchedPointNumber === 'off_board';
  }

  get _toBlocked() { 
    return this._touchedPoint.ownedByOpponent(this.playerNumber) && this._touchedPoint.blocked;
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
        return this._selectedPoint.number === 'bar' ? 0 : this._selectedPoint.number;
      case 2:
        return this._selectedPoint.number === 'bar' ? 25 : this._selectedPoint.number;
      default: 
        return null;
    }
  }

  get _toInt() {
    switch (this.playerNumber) {
      case 1:
        return this.touchedPointNumber === 'off_board' ? 25 : this.touchedPointNumber;
      case 2:
        return this.touchedPointNumber === 'off_board' ? 0 : this.touchedPointNumber;
      default: 
        return null;
    }
  }

  get _numberOfMoves() {
    // add one to count for the proposed move (from, to)
    return this.match.moveList.length + 1;
  }

  get _numberOfPiecesOnBoard() {
    return 15 - this.match.gameState.offBoard.piecesOwnedByPlayer(this.playerNumber).length;
  }
};

export default Move
