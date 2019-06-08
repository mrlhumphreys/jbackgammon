import fixtures from './fixtures'
import Match from '../src/match'

describe('Match', () => {
  describe('initialize', () => {
    describe('with no winner', () => {
      it('sets the notification to a players turn message', () => {
        let match = fixtures('match');
        expect(match.notification).toEqual('aaa to move');
      });
    });

    describe('with winner', () => {
      it('sets the notification to winner message', () => {
        let match = fixtures('winnerMatch');
        expect(match.notification).toEqual('bbb wins');
      });
    });
  });

  describe('asJson', () => {
    it('must return the match serialized as json', () => {
      let match = fixtures('match');
      expect(match.asJson).toEqual({
        id: 1,
        game_state: {
          current_player_number: 1,
          current_phase: 'move',
          dice: [
            { number: null, used: false },
            { number: null, used: false }
          ],
          bar: { 
            pieces: [],
            selected: false 
          },
          points: [
            { number: 1, selected: false, pieces: [ { owner: 1 }, { owner: 1 } ] },
            { number: 2, selected: false, pieces: [] },
            { number: 3, selected: false, pieces: [] },
            { number: 4, selected: false, pieces: [] },
            { number: 5, selected: false, pieces: [] },
            { number: 6, selected: false, pieces: [ { owner: 2 }, { owner: 2 }, { owner: 2 }, { owner: 2 }, { owner: 2 } ] },
            { number: 7, selected: false, pieces: [] },
            { number: 8, selected: false, pieces: [ { owner: 2 }, { owner: 2 }, { owner: 2 } ] },
            { number: 9, selected: false, pieces: [] },
            { number: 10, selected: false, pieces: [] },
            { number: 11, selected: false, pieces: [] },
            { number: 12, selected: false, pieces: [ { owner: 1 }, { owner: 1 }, { owner: 1 }, { owner: 1 }, { owner: 1 } ] },
            { number: 13, selected: false, pieces: [ { owner: 2 }, { owner: 2 }, { owner: 2 }, { owner: 2 }, { owner: 2 } ] },
            { number: 14, selected: false, pieces: [] },
            { number: 15, selected: false, pieces: [] },
            { number: 16, selected: false, pieces: [] },
            { number: 17, selected: false, pieces: [ { owner: 1 }, { owner: 1 }, { owner: 1 } ] },
            { number: 18, selected: false, pieces: [ ] },
            { number: 19, selected: false, pieces: [ { owner: 1 }, { owner: 1 }, { owner: 1 }, { owner: 1 }, { owner: 1 } ] },
            { number: 20, selected: false, pieces: [] },
            { number: 21, selected: false, pieces: [] },
            { number: 22, selected: false, pieces: [] },
            { number: 23, selected: false, pieces: [] },
            { number: 24, selected: false, pieces: [ { owner: 2 }, { owner: 2 } ] },
          ],
          off_board: {
            pieces: [],
            selected: false
          } 
        },
        players: [
          { name: 'aaa', player_number: 1, resigned: false },
          { name: 'bbb', player_number: 2, resigned: false }
        ],
        move_list: [],
        last_action: null,
        notification: "aaa to move" 
      });
    });
  });

  describe('winner', () => {
    describe('with someone winning on the board', () => {
      it('must return the player number of the winner', () => {
        let match = fixtures('winningRollMatch');
        expect(match.winner).toEqual(2);
      });
    });

    describe('with no one winning on the board', () => {
      it('must return null', () => {
        let match = fixtures('match');
        expect(match.winner).toBe(null);
      });
    });

    describe('with someone resigning', () => {
      it('must return the number of the player who did not resign', () => {
        let match = fixtures('resignedMatch');
        expect(match.winner).toEqual(2);
      });
    });
  });

  describe('passable', () => {
    describe('move phase and no moves and unused dice', () => {
      it('must return true', () => {
        let match = fixtures('moveMatch', {
          game_state: {
            bar: {
              pieces: [
                { owner: 1 },
                { owner: 1 }
              ]
            },
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
        let match = fixtures('moveMatch', {
          game_state: {
            bar: {
              pieces: [
                { owner: 1 },
                { owner: 1 }
              ]
            },
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
        let match = fixtures('rollMatch');
        expect(match.passable(1)).toBe(false);
      });
    });
  });

  describe('touchDice', () => {
    describe('with a last action', () => {
      it('clears last action', () => {
        let match = fixtures('rollMatch', { last_action: { kind: 'misc', data: { a: 1 } } });
        match.touchDice(1);
        expect(match.lastAction).toEqual({kind: 'roll', data: {}});
      });
    });

    describe('with a winner', () => {
      it('adds a notification', () => {
        let match = fixtures('winningRollMatch');
        match.touchDice(1);
        expect(match.notification).toEqual('Game is over.');
      });
    });

    describe('not on players turn', () => {
      it('adds a notification', () => {
        let match = fixtures('rollMatch', { game_state: { current_player_number: 2 } });
        match.touchDice(1);
        expect(match.notification).toEqual('It is not your turn.');
      });
    });

    describe('on move phase', () => {
      it('adds a notification', () => {
        let match = fixtures('moveMatch');
        match.touchDice(1);
        expect(match.notification).toEqual('Dice have already been rolled.');
      });
    });

    describe('on roll phase', () => {
      it('adds roll to last action', () => {
        let match = fixtures('rollMatch');
        match.touchDice(1);
        expect(match.lastAction.kind).toEqual('roll');
      });
    });
  });

  describe('touchPoint', () => {
    describe('with a last action', () => {
      it('clears last action', () => {
        let match = fixtures('moveMatch', { last_action: { kind: 'misc', data: { a: 1 } } });
        match.touchPoint(1, 1);
        expect(match.lastAction).toBe(null);
      });
    });

    describe('with a winner', () => {
      it('adds a notification', () => {
        let match = fixtures('winningRollMatch');
        match.touchPoint(1, 1);
        expect(match.notification).toEqual('Game is over.');
      });
    });

    describe('not on players turn', () => {
      it('adds a notification', () => {
        let match = fixtures('moveMatch', { game_state: { current_player_number: 2 }});
        match.touchPoint(1, 1);
        expect(match.notification).toEqual('It is not your turn.');
      });
    });

    describe('on roll phase', () => {
      it('adds a notification', () => {
        let match = fixtures('rollMatch');
        match.touchPoint(1, 1);
        expect(match.notification).toEqual('Pieces cannot move until the dice are rolled.');

      });
    });

    describe('on move phase', () => {
      describe('with point selected', () => {
        describe('with a valid move', () => {
          describe('always', () => {
            it('deselects point', () => {
              let match = fixtures('selectedMatch');
              match.touchPoint(2, 1);
              let point = match.gameState.findPoint(1);
              expect(point.selected).toBe(false);
            });

            it('moves the pieces', () => {
              let match = fixtures('selectedMatch');
              let fromId = 1;
              let toId = 2;

              match.touchPoint(toId, 1);

              let from = match.gameState.findPoint(fromId);
              let to = match.gameState.findPoint(toId);
              
              expect(from.pieces.length).toEqual(1); 
              expect(to.pieces.length).toEqual(1); 
            });

            it('uses the die', () => {
              let match = fixtures('selectedMatch');
              match.touchPoint(2, 1);

              let die = match.gameState.dice.findByNumber(1);

              expect(die.used).toBe(true);
            });

          });

          describe('with move complete', () => {
            it('passes the turn', () => {
              let match = fixtures('completedMoveMatch');
              match.touchPoint(3, 1);
              expect(match.gameState.currentPlayerNumber).toEqual(2);
            });

            it('adds move to the last action', () => {
              let match = fixtures('completedMoveMatch');
              match.touchPoint(3, 1);
              expect(match.lastAction).toEqual({kind: 'move', data: { moveList: [{from: 1, to: 2}, {from: 1, to: 3}] }});
            });

            it('clears the move list', () => {
              let match = fixtures('completedMoveMatch');
              match.touchPoint(3, 1);
              expect(match.moveList).toEqual([]);
            });
          });

          describe('with all pieces off board', () => {
            it('adds move to the last action', () => {
              let match = fixtures('allPiecesOffBoardMatch');
              match.touchPoint('off_board', 1);
              expect(match.lastAction).toEqual({ kind: 'move', data: { moveList: [ { from: 24, to: 'off_board' } ] } });
            });

            it('clears the move list', () => {
              let match = fixtures('allPiecesOffBoardMatch');
              match.touchPoint('off_board', 1);
              expect(match.moveList).toEqual([]);
            });
          });

          describe('with move continuing', () => {
            it('adds the move to the list', () => {
              let match = fixtures('selectedMatch');
              match.touchPoint(2, 1);
              expect(match.moveList).toEqual([{ from: 1, to: 2 }]);
            });
          });
        });

        describe('with an invalid move', () => {
          it('deselects the point', () => {
            let match = fixtures('selectedMatch');
            match.touchPoint(6, 1);
            let point = match.gameState.findPoint(1);
            expect(point.selected).toBe(false);
          });
        });
      });

      describe('with no point selected', () => {
        describe('with move possible', () => {
          it('selects the point', () => {
            let match = fixtures('moveMatch');
            match.touchPoint(1, 1);
            let point = match.gameState.findPoint(1);
            expect(point.selected).toBe(true);
          });
        });

        describe('with move not possible', () => {
          it('adds a notification', () => {
            let match = fixtures('noMovesMatch');
            match.touchPoint(1, 1);
            expect(match.notification).toEqual('Those pieces cannot move.');
          });
        });
      });
    });
  });

  describe('touchPass', () => {
    describe('when passable', () => {
      it('passes the turn', () => {
        let match = fixtures('singleMoveMatch');
        match.touchPass(1);
        expect(match.gameState.currentPlayerNumber).toEqual(2);
      });

      it('adds move to last action', () => {
        let match = fixtures('singleMoveMatch');
        match.touchPass(1);
        expect(match.lastAction).toEqual({kind: 'move', data: { moveList: [ { from: 4, to: 6 } ] } });
      });

      it('clears move list', () => {
        let match = fixtures('singleMoveMatch');
        match.touchPass(1);
        expect(match.moveList).toEqual([]);
      });
    });

    describe('when not passable', () => {
      it('does not add move to last action', () => {
        let match = fixtures('selectedMatch');
        match.touchPoint(2, 1);
        expect(match.lastAction).toEqual(null);
      });

      it('does not clear move list', () => {
        let match = fixtures('selectedMatch');
        match.touchPoint(2, 1);
        expect(match.moveList).toEqual([ { from: 1, to: 2 } ]);
      });
    });
  });
});
