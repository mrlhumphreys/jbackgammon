import fixtures from './fixtures'
import Move from '../src/move'
import Bar from '../src/bar'
import OffBoard from '../src/off_board'
import Point from '../src/point'
import GameState from '../src/game_state'

describe('Move', () => {
  describe('result', () => {
    describe('with winner', () => {
      it('returns a game over result', () => {
        let match = fixtures('winnerMatch');
        let move = new Move({ 
          touchedPointNumber: 1, 
          playerNumber: 1,
          match: match 
        });
         
        let result = move.result;

        expect(result.name).toEqual('GameOver');
        expect(result.message).toEqual('Game is over.');
      });
    });

    describe('when not players turn', () => {
      it('returns a not players turn result', () => {
        let match = fixtures('moveMatch');
        let move = new Move({ 
          touchedPointNumber: 1, 
          playerNumber: 2,
          match: match 
        });
         
        let result = move.result;

        expect(result.name).toEqual('NotPlayersTurn');
        expect(result.message).toEqual('It is not your turn.');
      });
    });

    describe('when roll phase', () => {
      it('returns a roll phase result', () => {
        let match = fixtures('rollMatch');
        let move = new Move({ 
          touchedPointNumber: 1, 
          playerNumber: 1,
          match: match 
        });
         
        let result = move.result;

        expect(result.name).toEqual('RollPhase');
        expect(result.message).toEqual('Pieces cannot move until the dice are rolled.');
      });
    });

    describe('when no piece selected', () => {
      describe('from bar', () => {
        describe('with no pieces owned by player', () => {
          it('must return a no pieces result', () => {
            let match = fixtures('moveMatch');
            let move = new Move({ 
              touchedPointNumber: 'bar', 
              playerNumber: 1,
              match: match 
            });
          
            let result = move.result;

            expect(result.name).toEqual('NoPieces');
            expect(result.message).toEqual('There are no pieces on the bar.');
          });
        });

        describe('with no destinations', () => {
          it('must return a blocked result', () => {
            let match = fixtures('noMovesFromBarMatch');
            let move = new Move({ 
              touchedPointNumber: 'bar', 
              playerNumber: 1,
              match: match 
            });

            let result = move.result;

            expect(result.name).toEqual('Blocked');
            expect(result.message).toEqual('Those pieces cannot move.');
          });
        });

        describe('with possible moves', () => {
          it('must return a move possible result', () => {
            let match = fixtures('moveFromBarMatch');
            let move = new Move({ 
              touchedPointNumber: 'bar', 
              playerNumber: 1,
              match: match 
            });

            let result = move.result;
 
            expect(result.name).toEqual('MovePossible');
            expect(result.message).toEqual('');
          });
        });
      });

      describe('from point', () => {
        describe('with no pieces', () => {
          it('must return an empty point result', () => {
            let match = fixtures('moveMatch');
            let move = new Move({ 
              touchedPointNumber: 2, 
              playerNumber: 1,
              match: match 
            });

            let result = move.result;

            expect(result.name).toEqual('EmptyPoint');
            expect(result.message).toEqual('That point is empty.');
          });
        });

        describe('owned by opponent', () => {
          it('must return a point ownership mismatch result', () => {
            let match = fixtures('moveMatch');
            let move = new Move({ 
              touchedPointNumber: 6, 
              playerNumber: 1,
              match: match 
            });
          
            let result = move.result;

            expect(result.name).toEqual('PointOwnershipMismatch');
            expect(result.message).toEqual('That point is not yours.');
          });
        });

        describe('with pieces still on the bar', () => {
          it('must return a pieces on bar result', () => {
            let match = fixtures('moveFromBarMatch');
            let move = new Move({ 
              touchedPointNumber: 9, 
              playerNumber: 1,
              match: match 
            });

            let result = move.result;

            expect(result.name).toEqual('PiecesOnBar');
            expect(result.message).toEqual('There are still pieces on the bar.');
          });
        });

        describe('with no destinations', () => {
          describe('and some pieces are not home', () => {
            it('must return a blocked result', () => {
              let match = fixtures('noMovesMatch');
              let move = new Move({ 
                touchedPointNumber: 1, 
                playerNumber: 1,
                match: match 
              });

              let result = move.result;

              expect(result.name).toEqual('Blocked');
              expect(result.message).toEqual('Those pieces cannot move.');
            });
          });

          describe('and all pieces are home', () => {
            describe('and can bear off', () => {
              it('must return a move possible result', () => {
                let match = fixtures('bearingOffMatch');
                let move = new Move({ 
                  touchedPointNumber: 6, 
                  playerNumber: 2, 
                  match: match 
                });

                let result = move.result;

                expect(result.name).toEqual('MovePossible');
                expect(result.message).toEqual('');
              });
            });

            describe('and cannot bear off', () => {
              it('must return a blocked result', () => {
                let match = fixtures('bearingOffDiceMismatchMatch');
                let move = new Move({ 
                  touchedPointNumber: 5, 
                  playerNumber: 2, 
                  match: match 
                });

                let result = move.result;

                expect(result.name).toEqual('Blocked');
                expect(result.message).toEqual('Those pieces cannot move.');
              });
            });
          });
        });

        describe('with no problems', () => {
          it('must return a move possible result', () => {
            let match = fixtures('moveMatch');
            let move = new Move({ 
              touchedPointNumber: 1, 
              playerNumber: 1,
              match: match 
            });
            let result = move.result;

            expect(result.name).toEqual('MovePossible');
            expect(result.message).toEqual('');
          });
        });
      });
    });

    describe('when piece selected', () => {
      describe('and to is off board', () => {
        describe('and move is complete', () => {
          it('must return a move complete result', () => {
            let match = fixtures('bearingOffCompletedMatch');
            let move = new Move({ 
              touchedPointNumber: 'off_board', 
              playerNumber: 2,
              match: match,
            });
          
            let result = move.result;

            expect(result.name).toEqual('MoveComplete');
            expect(result.message).toEqual('');
          });
        });

        describe('and move is incomplete and all pieces off board', () => {
          it('must return all pieces off board result', () => {
            let match = fixtures('bearingOffOnlyOnePieceMatch');
            let move = new Move({ 
              touchedPointNumber: 'off_board', 
              playerNumber: 2,
              match: match 
            });
          
            let result = move.result;

            expect(result.name).toEqual('MoveComplete');
            expect(result.message).toEqual('');
          }); 
        });

        describe('and move is incomplete and not all pieces are off board', () => {
          it('must return a move incomplete result', () => {
            let match = fixtures('bearingOffIncompleteMatch');
            let move = new Move({ 
              touchedPointNumber: 'off_board', 
              playerNumber: 2,
              match: match 
            });
          
            let result = move.result;

            expect(result.name).toEqual('MoveIncomplete');
            expect(result.message).toEqual('');
          });
        });
        
        describe('and some pieces are not home', () => {
          it('must return a pieces not home result', () => {
            let match = fixtures('piecesNotHomeSelectedMatch');
            let move = new Move({ 
              touchedPointNumber: 'off_board', 
              playerNumber: 1,
              match: match 
            });

            let result = move.result;

            expect(result.name).toEqual('PiecesNotHome');
            expect(result.message).toEqual('Cannot bear off while pieces are not home.');
          });
        });

        describe('and dice mismatch moves', () => {
          it('must return a dice mismatch result', () => {
            let match = fixtures('diceMismatchSelectedMatch');
            let move = new Move({ 
              touchedPointNumber: 'off_board', 
              playerNumber: 1,
              match: match 
            });
          
            let result = move.result;

            expect(result.name).toEqual('DiceMismatch');
            expect(result.message).toEqual('That move does not match the die roll.');
          });
        });
      });

      describe('and to is point', () => {
        describe('and move is complete', () => {
          it('must return a move complete result', () => {
            let match = fixtures('completedMoveMatch');
            let move = new Move({ 
              touchedPointNumber: 3, 
              playerNumber: 1,
              match: match 
            });
          
            let result = move.result;

            expect(result.name).toEqual('MoveComplete');
            expect(result.message).toEqual('');
          });
        });

        describe('and move is incomplete', () => {
          it('must return a move incomplete result', () => {
            let match = fixtures('incompleteMoveMatch');
            let move = new Move({ 
              touchedPointNumber: 2, 
              playerNumber: 1,
              match: match
            });
          
            let result = move.result;

            expect(result.name).toEqual('MoveIncomplete');
            expect(result.message).toEqual('');
          });
        });

        describe('and dice mismatch moves', () => {
          it('must return a dice mismatch result', () => {
            let match = fixtures('selectedMatch');
            let move = new Move({ 
              touchedPointNumber: 4, 
              playerNumber: 1,
              match: match 
            });
          
            let result = move.result;

            expect(result.name).toEqual('DiceMismatch');
            expect(result.message).toEqual('That move does not match the die roll.');
          });
        });

        describe('and to is blocked', () => {
          it('must return a blocked result', () => {
            let match = fixtures('blockedSelectedMatch');
            let move = new Move({ 
              touchedPointNumber: 13, 
              playerNumber: 1,
              match: match 
            });
          
            let result = move.result;

            expect(result.name).toEqual('OpponentBlock');
            expect(result.message).toEqual('An opponent is blocking that point.');
          });
        });

        describe('and is in wrong direction', () => {
          it('must return a wrong direction result', () => {
            let match = fixtures('blockedSelectedMatch');
            let move = new Move({ 
              touchedPointNumber: 11, 
              playerNumber: 1,
              match: match 
            });
          
            let result = move.result;

            expect(result.name).toEqual('WrongDirection');
            expect(result.message).toEqual('A piece cannot move backwards.');
          });
        });
      });
    });
  });

  describe('dieNumber', () => {
    describe('with dice matching distance', () => {
      it('returns the distance', () => {
        let match = fixtures('selectedMatch');
        let move = new Move({ 
          touchedPointNumber: 2, 
          playerNumber: 1,
          match: match 
        });

        expect(move.dieNumber).toEqual(1);
      });
    });

    describe('with dice not matching distance', () => {
      it('returns the highest unused die number', () => {
        let match = fixtures('usedDiceMatch');
        let move = new Move({ 
          touchedPointNumber: 4, 
          playerNumber: 1,
          match: match 
        });

        expect(move.dieNumber).toEqual(2);
      });
    });
  });

  describe('details', () => {
    it('returns from and to', () => {
      let match = fixtures('selectedMatch');
      let move = new Move({ 
        touchedPointNumber: 4,
        playerNumber: 1,
        match: match
      });

      expect(move.details).toEqual({ from: 1, to: 4 });
    });
  });

  describe('complete', () => {
    describe('without from', () => {
      it('returns false', () => {
        let match = fixtures('match');
        let move = new Move({ 
          touchedPointNumber: 4, 
          playerNumber: 1,
          match: match 
        });

        expect(move.complete).toBe(false);
      });
    });

    describe('without to', () => {
      it('returns false', () => {
        let match = fixtures('selectedMatch');
        let move = new Move({ 
          touchedPointNumber: null, 
          match: match 
        });
  
        expect(move.complete).toBe(false);
      });
    });

    describe('number of moves does not match number of dice', () => {
      it('returns false', () => {
        let match = fixtures('selectedMatch');
        let move = new Move({ 
          touchedPointNumber: 2, 
          playerNumber: 1,
          match: match 
        });

        expect(move.complete).toBe(false);
      });
    });

    describe('number of moves match number of dice', () => {
      it('returns true', () => {
        let match = fixtures('completedMoveMatch');
        let move = new Move({ 
          touchedPointNumber: 3, 
          playerNumber: 1,
          match: match 
        });

        expect(move.complete).toBe(true);
      });
    });
  });

  describe('allPiecesOffBoard', () => {
    describe('number of moves matches number of pieces on board', () => {
      it('returns true', () => {
        let match = fixtures('allPiecesOffBoardMatch');
        let move = new Move({ 
          touchedPointNumber: 'off_board', 
          playerNumber: 1,
          match: match 
        });

        expect(move.allPiecesOffBoard).toBe(true);
      });
    });

    describe('number of moves does not match number of pieces on board', () => {
      it('returns false', () => {
        let match = fixtures('almostAllPiecesOffBoardMatch');
        let move = new Move({ 
          touchedPointNumber: 'off_board', 
          playerNumber: 1,
          match: match 
        });

        expect(move.allPiecesOffBoard).toBe(false);
      });
    });
  });

  describe('completeMoveList', () => {
    it('returns the list with the proposed move', () => {
      let match = fixtures('completedMoveMatch');
      let move = new Move({ 
        touchedPointNumber: 3, 
        playerNumber: 1,
        match: match
      });

      expect(move.completeMoveList).toEqual([
        { from: 1, to: 2 },
        { from: 1, to: 3 }
      ]);
    });
  });
});
