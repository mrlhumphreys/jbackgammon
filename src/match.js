import exists from './exists'
import GameState from './game_state'
import Move from './move'

class Match {
  constructor(args) { 
    this.id = args.id;
    this.gameState = new GameState(args.game_state);
    this.players = args.players;
    this.winner = args.winner;
    this.moveList = exists(args.move_list) ? args.move_list : [];
    this.lastAction = exists(args.last_action) ? args.last_action : {};
  }

  asJson() {
    return {
      id: this.id,
      game_state: this.gameState.asJson(),
      players: this.players,
      winner: this.winner,
      move_list: this.moveList,
      last_action: this.lastAction
    };
  }

  playersTurn(playerNumber) { 
    return this.gameState.playersTurn(playerNumber);
  }

  playersName(number) { 
    let index = number - 1;
    return this.players[index].name;
  }

  currentPlayerName() {
    return this.playersName(this.gameState.currentPlayerNumber);
  }

  winnerName() {
    if (exists(this.winner)) {
      return this.playersName(this.winner);
    } else {
      return null;
    }
  } 

  selectedPoint() {
    return this.gameState.selectedPoint();
  }

  rollPhase() {
    return this.gameState.rollPhase();
  }

  movePhase() {
    return this.gameState.movePhase();
  }

  findPoint(pointNumber) {
    return this.gameState.findPoint(pointNumber);
  }

  barPlayerOne() {
    return this.gameState.bar.piecesOwnedByPlayer(1);
  }

  barSelected() {
    return this.gameState.bar.selected;
  }

  barPlayerTwo() {
    return this.gameState.bar.piecesOwnedByPlayer(2);
  }

  offBoardPlayerOne() {
    return this.gameState.offBoard.piecesOwnedByPlayer(1);
  }

  offBoardSelected() {
    return this.gameState.offBoard.selected;
  }

  offBoardPlayerTwo() {
    return this.gameState.offBoard.piecesOwnedByPlayer(2);
  }

  movePossible(fromId, user) {
    return this.gameState.movePossible(fromId, user);  
  }

  moveValid(fromId, toId, moveList, user) {
    return this.gameState.moveValid(fromId, toId, moveList, user);
  }

  moveComplete(fromId, toId, moveList, user) {
    return this.gameState.moveComplete(fromId, toId, moveList, user);
  }

  moveDieNumber(fromId, toId, user) {
    return this.gameState.moveDieNumber(fromId, toId, user);
  }

  moveDetails(fromId, toId) {
    return this.gameState.moveDetails(fromId, toId);
  }

  moveAllPiecesOffBoard(moveList, user) {
    return this.gameState.moveAllPiecesOffBoard(moveList, user);
  }

  moveCompleteMoveList(fromId, toId, moveList) {
    return this.gameState.moveCompleteMoveList(fromId, toId, moveList);
  }

  moveErrorMessage(fromId, user) {
    return this.gameState.moveErrorMessage(fromId, user);
  }

  passable(playerNumber) { 
    let playersTurn = this.playersTurn(playerNumber);
    let movePhase = this.movePhase();
    let noMoves = this.gameState.noMovesForPlayer(playerNumber);
    let unusedDice = this.gameState.dice.unused().length() > 0;
    return playersTurn && movePhase && noMoves && unusedDice;
  }

  // actions

  select(pointName) {
    switch (pointName) {
      case 'bar':
        this.selectBar();
        break;
      default:
        this.selectPoint(pointName);
    } 
  }

  selectBar() {
    this.gameState.selectBar();
  }

  selectPoint(pointNumber) {
    this.gameState.selectPoint(pointNumber);
  }

  deselect() {
    this.gameState.deselect();
  }

  move(fromNumber, toNumber, playerNumber) {
    this.gameState.move(fromNumber, toNumber, playerNumber);
  }

  useDie(number) {
    this.gameState.useDie(number);
  }

  addMoveToList(move) {
    this.moveList.push(move);    
  }

  clearMoveList() {
    this.moveList = [];
  }

  notify(message) {
    this.lastAction = { kind: 'notification', data: { message: message } };
  }

  addRollToLastAction() {
    this.lastAction = { kind: 'roll', data: {} };
  }

  addMoveToLastAction(moveList) {
    this.lastAction = { kind: 'move', data: { moveList: moveList } };
  }

  // user actions

  touchDice(playerNumber) {
    if (exists(this.winner)) {
      this.notify('Game is over.'); 
    } else if (!this.playersTurn(playerNumber)) {
      this.notify('It is not your turn.');
    } else if (this.movePhase()) {
      this.notify('Dice have already been rolled.');
    } else if (this.rollPhase()) {
      this.addRollToLastAction();
    }
  }

  touchPoint(pointNumber, playerNumber) {
    if (exists(this.winner)) {
      this.notify('Game is over.'); 
    } else if (!this.playersTurn(playerNumber)) {
      this.notify('It is not your turn.');
    } else if (this.rollPhase()) {
      this.notify('Pieces cannot move until the dice are rolled.');
    } else if (this.movePhase()) {
      let selectedPoint = this.selectedPoint();
      let point = this.findPoint(pointNumber);

      if (exists(selectedPoint)) {
        let move = new Move({
          from: selectedPoint, 
          to: point, 
          moveList: this.moveList, 
          user: { playerNumber: playerNumber }, 
          gameState: this.gameState
        });

        if (move.valid()) {
          if (move.complete() || move.allPiecesOffBoard()) {
            this.deselect();
            this.move(selectedPoint.number, pointNumber);
            this.useDie(move.dieNumber());
            this.addMoveToLastAction(move.completeMoveList());
            this.clearMoveList();
          } else {
            this.deselect();
            this.move(selectedPoint.number, pointNumber);
            this.useDie(move.dieNumber());
            this.addMoveToList(move.details());
          }
        } else {
          this.deselect();
        }
      } else {
        let move = new Move({
          from: point, 
          user: { playerNumber: playerNumber },
          gameState: this.gameState
        });

        if (move.possible()) {
          this.select(pointNumber);
        } else {
          this.notify(move.error.message);
        }
      }
    }
  }

  touchPass(playerNumber) {
    if (this.passable(playerNumber)) {
      this.addMoveToLastAction(this.moveList);
      this.clearMoveList();
    }
  }
}

export default Match
