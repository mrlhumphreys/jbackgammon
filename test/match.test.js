import fixtures from './fixtures'
import Match from '../src/match'

describe('Match', () => {
  describe('playersTurn', () => {
    it('must return the result of game state players turn', () => {
      let match = fixtures('match');
      expect(match.playersTurn(1)).toBe(true);
    });
  });

  describe('playersName', () => {
    it('must return the name of the player with the provided number', () => {
      let match = fixtures('match');
      expect(match.playersName(1)).toEqual('aaa');
    });
  });

  describe('currentPlayerName', () => {
    it('must return the name of the current player', () => {
      let match = fixtures('match');
      expect(match.currentPlayerName()).toEqual('aaa');
    });
  });

  describe('winnerName', () => {
    describe('if no winner', () => {
      it('must return null', () => {
        let match = fixtures('match', { winner: null });
        expect(match.winnerName()).toBe(null);
      });
    });

    describe('if winner', () => {
      it('must return the name of the winner', () => {
        let match = fixtures('match', { winner: 2 });
        expect(match.winnerName()).toEqual('bbb');
      });
    });
  });

  describe('selectedPoint', () => {
    it('must return the selected point of game state', () => {
      let match = fixtures('match', { 
        game_state: {
          points: [
            { number: 1, selected: true, pieces: [ { owner: 1 } ] },
            { number: 2, selected: false, pieces: [ { owner: 1 } ] }
          ]
        }
      });

      expect(match.selectedPoint().number).toEqual(1);
    });
  });

  describe('rollPhase', () => {
    describe('when phase is roll', () => {
      it('should return true', () => {
        let match = fixtures('match', {
          game_state: {
            current_phase: 'roll'
          }
        }); 

        expect(match.rollPhase()).toBe(true);
      });
    });

    describe('when phase is move', () => {
      it('should return false', () => {
        let match = fixtures('match', {
          game_state: {
            current_phase: 'move'
          }
        });

        expect(match.rollPhase()).toBe(false);
      });
    });
  });

  describe('movePhase', () => {
    describe('when phase is move', () => {
      it('should return true', () => {
        let match = fixtures('match', {
          game_state: {
            current_phase: 'move'
          }
        });

        expect(match.movePhase()).toBe(true);
      });
    });

    describe('when phase is roll', () => {
      it('should return false', () => {
        let match = fixtures('match', {
          game_state: {
            current_phase: 'roll'
          }
        }); 

        expect(match.movePhase()).toBe(false);
      });
    });
  });

  describe('findPoint', () => {
    it('should return the point specified', () => {
      let match = fixtures('match', {
        game_state: {
          points: [
            { number: 1, pieces: [] },
            { number: 2, pieces: [] }
          ]
        }
      });

      expect(match.findPoint(2).number).toEqual(2);
    });
  });

  describe('barPlayerOne', () => {
    it('should return the pieces on the bar owned by player one', () => {
      let match = fixtures('match', {
        game_state: {
          bar: {
            pieces: [
              { owner: 1 },
              { owner: 1 },
              { owner: 2 }
            ]
          } 
        }
      });

      let result = match.barPlayerOne();

      expect(result.length).toEqual(2);
      expect(result[0].owner).toEqual(1);
    });
  });

  describe('barSelected', () => {
    describe('when bar is selected', () => {
      it('should return true', () => {
        let match = fixtures('match', {
          game_state: {
            bar: {
              selected: true
            }
          }
        });

        expect(match.barSelected()).toBe(true);
      });
    });

    describe('when bar is not selected', () => {
      it('should return false', () => {
        let match = fixtures('match', {
          game_state: {
            bar: {
              selected: false
            }
          }
        });

        expect(match.barSelected()).toBe(false);
      });
    });
  });

  describe('barPlayerTwo', () => {
    it('should return the pieces on the bar owned by player one', () => {
      let match = fixtures('match', {
        game_state: {
          bar: {
            pieces: [
              { owner: 1 },
              { owner: 1 },
              { owner: 2 }
            ]
          } 
        }
      });

      let result = match.barPlayerTwo();

      expect(result.length).toEqual(1);
      expect(result[0].owner).toEqual(2);
    });
  });

  describe('offBoardPlayerOne', () => {
    it('should return the pieces off board owned by player one', () => {
      let match = fixtures('match', {
        game_state: {
          off_board: {
            pieces: [
              { owner: 1 },
              { owner: 1 },
              { owner: 2 }
            ]
          } 
        }
      });

      let result = match.offBoardPlayerOne();

      expect(result.length).toEqual(2);
      expect(result[0].owner).toEqual(1);
    });
  });

  describe('offBoardSelected', () => {
    describe('when off board is selected', () => {
      it('should return true', () => {
        let match = fixtures('match', {
          game_state: {
            off_board: {
              selected: true
            }
          }
        });

        expect(match.offBoardSelected()).toBe(true);
      });
    });

    describe('when off board is not selected', () => {
      it('should return false', () => {
        let match = fixtures('match', {
          game_state: {
            off_board: {
              selected: false 
            }
          }
        });

        expect(match.offBoardSelected()).toBe(false);
      });
    });
  });

  describe('offBoardPlayerTwo', () => {
    it('should return the pieces off board owned by player two', () => {
      let match = fixtures('match', {
        game_state: {
          off_board: {
            pieces: [
              { owner: 1 },
              { owner: 1 },
              { owner: 2 }
            ]
          } 
        }
      });

      let result = match.offBoardPlayerTwo();

      expect(result.length).toEqual(1);
      expect(result[0].owner).toEqual(2);
    });
  });

  describe('passable', () => {
    describe('move phase and no moves and unused dice', () => {
      it('must return true', () => {
        let match = fixtures('match', {
          game_state: {
            bar: {
              pieces: [
                { owner: 1 },
                { owner: 1 }
              ]
            },
            current_phase: 'move',
            dice: [
              { number: 1, used: false },
              { number: 2, used: false }
            ],
            points: [
              { number: 1, pieces: [ { owner: 2 }, { owner: 2 } ] },
              { number: 2, pieces: [ { owner: 2 }, { owner: 2 } ] }
            ]
          }
        });

        expect(match.passable(1)).toBe(true);
      });
    });

    describe('move phase and no moves and all dice used', () => {
      it('must return false', () => {
        let match = fixtures('match', {
          game_state: {
            bar: {
              pieces: [
                { owner: 1 },
                { owner: 1 }
              ]
            },
            current_phase: 'move',
            dice: [
              { number: 1, used: true },
              { number: 2, used: true }
            ],
            points: [
              { number: 1, pieces: [ { owner: 2 }, { owner: 2 } ] },
              { number: 2, pieces: [ { owner: 2 }, { owner: 2 } ] }
            ]
          }
        });

        expect(match.passable(1)).toBe(false);
      });
    });

    describe('roll phase', () => {
      it('must return false', () => {
        let match = fixtures('match', {
          game_state: {
            current_phase: 'roll'
          }
        });

        expect(match.passable(1)).toBe(false);
      });
    });
  });

  describe('movePossible', () => {
    it('must return the result from move', () => {
      let match = fixtures('match', {
        game_state: {
          current_phase: 'move',
          dice: [
            { number: 1 },
            { number: 1 } 
          ]
        }
      });
      let fromId = 1;
      let user = { playerNumber: 1 };

      expect(match.movePossible(fromId, user)).toBe(true);
    }); 
  });

  describe('moveValid', () => {
    it('must return the result from move', () => {
      let match = fixtures('match', {
        game_state: {
          current_phase: 'move',
          dice: [
            { number: 1 },
            { number: 1 }
          ]
        }
      });
      let fromId = 1;
      let toId = 2;
      let moveList = [];
      let user = { playerNumber: 1 };

      expect(match.moveValid(fromId, toId, moveList, user)).toBe(true);
    });
  });

  describe('moveComplete', () => {
    it('must return the result from move', () => {
      let match = fixtures('match', {
        game_state: {
          current_phase: 'move',
          dice: [
            { number: 1 },
            { number: 1 }
          ]
        }
      });
      let fromId = 1;
      let toId = 2;
      let moveList = [{from: 1, to: 2}];
      let user = { playerNumber: 1 };

      expect(match.moveComplete(fromId, toId, moveList, user)).toBe(true);
    });
  });

  describe('moveDieNumber', () => {
    it('must return the result from move', () => {
      let match = fixtures('match', {
        game_state: {
          current_phase: 'move',
          dice: [
            { number: 1 },
            { number: 1 }
          ]
        }
      });
      let fromId = 1;
      let toId = 2;
      let user = { playerNumber: 1 };
      
      expect(match.moveDieNumber(fromId, toId, user)).toEqual(1);
    });
  });

  describe('moveDetails', () => {
    it('must return the result from move', () => {
      let match = fixtures('match', {
        game_state: {
          current_phase: 'move',
          dice: [
            { number: 1 },
            { number: 1 }
          ]
        }
      });
      let fromId = 1;
      let toId = 2;

      expect(match.moveDetails(fromId, toId)).toEqual({from: 1, to: 2});
    });
  });

  describe('moveAllPiecesOffBoard', () => {
    it('must return the result from move', () => {
      let match = fixtures('match', {
        game_state: {
          current_phase: 'move',
          dice: [
            { number: 1 },
            { number: 1 }
          ],
          off_board: { 
            pieces: [
              { owner: 1 },
              { owner: 1 },
              { owner: 1 },
              { owner: 1 },
              { owner: 1 },
              { owner: 1 },
              { owner: 1 },
              { owner: 1 },
              { owner: 1 },
              { owner: 1 },
              { owner: 1 },
              { owner: 1 },
              { owner: 1 }
            ]
          }, 
          points: [
            { number: 1, pieces: [ { onwer: 1 } ] }
          ]
        }
      });
      let moveList = [ { from: 1, to: 2 } ] 
      let user = { playerNumber: 1 }; 

      expect(match.moveAllPiecesOffBoard(moveList, user)).toBe(true);
    });
  });

  describe('moveCompleteMoveList', () => {
    it('must return the result from move', () => {
      let match = fixtures('match', { 
        game_state: {
          current_phase: 'move',
          dice: [
            { number: 1 },
            { number: 1 }
          ]
        }
      });
      let fromId = 1;
      let toId = 2;
      let moveList = [{ from: 1, to: 2 }];
      expect(match.moveCompleteMoveList(fromId, toId, moveList)).toEqual([{from: 1, to: 2}, {from: 1, to: 2}]);
    });
  });

  describe('moveErrorMessage', () => {
    it('must return the result from move', () => {
      let match = fixtures('match', {
        game_state: {
          current_phase: 'move',
          dice: [
            { number: 1 },
            { number: 1 }
          ]
        }
      });
      let fromId = 2;
      let user = { playerNumber: 1 };
      expect(match.moveErrorMessage(fromId, user)).toEqual('That point is empty.');
    });
  });
});
