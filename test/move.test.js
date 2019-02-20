import fixtures from './fixtures'
import Move from '../src/move'
import Bar from '../src/bar'
import OffBoard from '../src/off_board'
import Point from '../src/point'
import GameState from '../src/game_state'

describe('Move', () => {
  describe('possible', () => {
    describe('from bar', () => {
      describe('with no pieces on the bar', () => {
        it('must set an error', () => {
          let from = fixtures('bar', { pieces: [] });
          let gameState = fixtures('gameState', { 
            bar: { pieces: [] }, 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ] 
          });
          let move = fixtures('move', { from: from, gameState: gameState });
          
          move.possible();

          expect(move.error.name).toEqual('NoPiecesError');
        });
      });

      describe('with nowhere to move', () => {
        it('must set an error', () => {
          let from = fixtures('bar', { pieces: [ { owner: 1 } ] });
          let gameState = fixtures('gameState', { 
            bar: { pieces: [ { owner: 1 } ] }, 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 1, pieces: [ { owner: 2 }, { owner: 2 } ] },
              { number: 2, pieces: [ { owner: 2 }, { owner: 2 } ] }
            ]
          });
          let move = fixtures('move', { from: from, gameState: gameState });
          
          move.possible();

          expect(move.error.name).toEqual('BlockedError');
        });
      });

      describe('somewhere to move', () => {
        it('must not set an error', () => {
          let from = fixtures('bar', { pieces: [ { owner: 1 } ] });
          let gameState = fixtures('gameState', { 
            bar: { pieces: [ { owner: 1 } ] }, 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 1, pieces: [ ] },
              { number: 2, pieces: [ ] }
            ]
          });
          let move = fixtures('move', { from: from, gameState: gameState });
          
          move.possible();

          expect(move.error).toBe(null);
        });
      });
    });

    describe('from point', () => {
      describe('with no pieces on the point', () => {
        it('must set an error', () => {
          let from = fixtures('point', { number: 1, pieces: [ ] });
          let gameState = fixtures('gameState', { 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 1, pieces: [ ] },
              { number: 2, pieces: [ ] },
              { number: 3, pieces: [ ] }
            ]
          });
          let move = fixtures('move', { from: from, gameState: gameState });
          
          move.possible();

          expect(move.error.name).toEqual('EmptyPointError');
        });
      });

      describe('with a point owned by the other player', () => {
        it('must set an error', () => {
          let from = fixtures('point', { number: 1, pieces: [ { owner: 2 } ] });
          let gameState = fixtures('gameState', { 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 1, pieces: [ { owner: 2 } ] },
              { number: 2, pieces: [ ] },
              { number: 3, pieces: [ ] }
            ]
          });
          let move = fixtures('move', { from: from, gameState: gameState });
          
          move.possible();

          expect(move.error.name).toEqual('PointOwnershipError');
        });
      });

      describe('with pieces still on the bar', () => {
        it('must set an error', () => {
          let from = fixtures('point', { number: 1, pieces: [ { owner: 1 } ] });
          let gameState = fixtures('gameState', { 
            bar: { pieces: [ { owner: 1 } ] },
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 1, pieces: [ { owner: 1 } ] },
              { number: 2, pieces: [ ] },
              { number: 3, pieces: [ ] }
            ]
          });
          let move = fixtures('move', { from: from, gameState: gameState });
          
          move.possible();

          expect(move.error.name).toEqual('PiecesOnBarError');
        });
      });

      describe('with nowhere to move', () => {
        it('must set an error', () => {
          let from = fixtures('point', { number: 1, pieces: [ { owner: 1 } ] });
          let gameState = fixtures('gameState', { 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 1, pieces: [ { owner: 1 } ] },
              { number: 2, pieces: [ { owner: 2 }, { owner: 2 }] },
              { number: 3, pieces: [ { owner: 2 }, { owner: 2 }] }
            ]
          });
          let move = fixtures('move', { from: from, gameState: gameState });
          
          move.possible();

          expect(move.error.name).toEqual('BlockedError');
        });
      });

      describe('with somehwere to move', () => {
        it('must not set an error', () => {
          let from = fixtures('point', { number: 1, pieces: [ { owner: 1 } ] });
          let gameState = fixtures('gameState', { 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 1, pieces: [ { owner: 1 } ] },
              { number: 2, pieces: [ ] },
              { number: 3, pieces: [ ] }
            ]
          });
          let move = fixtures('move', { from: from, gameState: gameState });
          
          move.possible();

          expect(move.error).toBe(null);
        });
      });
    });
  });

  describe('valid', () => {
    describe('to Offboard', () => {
      describe('with some pieces are not home', () => {
        it('must set an error', () => {
          let from = fixtures('point', { number: 24, pieces: [ { owner: 1 } ] });
          let to = fixtures('offBoard', { pieces: [] });
          let gameState = fixtures('gameState', { 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 18, pieces: [ { owner: 1 } ] },
              { number: 24, pieces: [ { owner: 1 } ] }
            ]
          });
          let move = fixtures('move', { from: from, to: to, gameState: gameState });
          
          move.valid();

          expect(move.error.name).toEqual('PiecesNotHomeError');
        });
      });

      describe('with dice not matching moves', () => {
        it('must set an error', () => {
          let from = fixtures('point', { number: 22, pieces: [ { owner: 1 } ] });
          let to = fixtures('offBoard', { pieces: [] });
          let gameState = fixtures('gameState', { 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 22, pieces: [ { owner: 1 } ] }
            ]
          });
          let move = fixtures('move', { from: from, to: to, gameState: gameState });
          
          move.valid();

          expect(move.error.name).toEqual('DiceMismatchError');
        });
      });

      describe('with nothing wrong', () => {
        it('must not set an error', () => {
          let from = fixtures('point', { number: 24, pieces: [ { owner: 1 } ] });
          let to = fixtures('offBoard', { pieces: [] });
          let gameState = fixtures('gameState', { 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 24, pieces: [ { owner: 1 } ] }
            ]
          });
          let move = fixtures('move', { from: from, to: to, gameState: gameState });
          
          move.valid();

          expect(move.error).toBe(null);
        });
      });
    });

    describe('to point', () => {
      describe('with dice not matching moves', () => {
        it('must set an error', () => {
          let from = fixtures('point', { number: 1, pieces: [ { owner: 1 } ] });
          let to = fixtures('point', { number: 4, pieces: [] });
          let gameState = fixtures('gameState', { 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 1, pieces: [ { owner: 1 } ] }
            ]
          });
          let move = fixtures('move', { from: from, to: to, gameState: gameState });
          
          move.valid();

          expect(move.error.name).toEqual('DiceMismatchError');
        });
      });

      describe('with to blocked', () => {
        it('must set an error', () => {
          let from = fixtures('point', { number: 1, pieces: [ { owner: 1 } ] });
          let to = fixtures('point', { number: 2, pieces: [ { owner: 2 }, { owner: 2 } ] });
          let gameState = fixtures('gameState', { 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 1, pieces: [ { owner: 1 } ] },
              { number: 2, pieces: [ { owner: 2 }, { owner: 2 } ] }
            ]
          });
          let move = fixtures('move', { from: from, to: to, gameState: gameState });
          
          move.valid();

          expect(move.error.name).toEqual('OpponentBlockError');
        });
      });

      describe('moving the wrong direction', () => {
        it('must set an error', () => {
          let from = fixtures('point', { number: 6, pieces: [ { owner: 1 } ] });
          let to = fixtures('point', { number: 5, pieces: [ ] });
          let gameState = fixtures('gameState', { 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 5, pieces: [ ] },
              { number: 6, pieces: [ { owner: 1 } ] }
            ]
          });
          let move = fixtures('move', { from: from, to: to, gameState: gameState });
          
          move.valid();

          expect(move.error.name).toEqual('WrongDirectionError');
        });
      });

      describe('with nothing wrong', () => {
        it('must not set an error', () => {
          let from = fixtures('point', { number: 1, pieces: [ { owner: 1 } ] });
          let to = fixtures('point', { number: 2, pieces: [ ] });
          let gameState = fixtures('gameState', { 
            current_phase: 'move', 
            dice: [ { number: 1 }, { number: 2 } ], 
            points: [
              { number: 1, pieces: [ { owner: 1 } ] },
              { number: 2, pieces: [ ] }
            ]
          });
          let move = fixtures('move', { from: from, to: to, gameState: gameState });
          
          move.valid();

          expect(move.error).toBe(null);
        });
      });
    });
  });

  describe('dieNumber', () => {
    describe('with dice matching distance', () => {
      it('returns the distance', () => {
        let from = fixtures('point', { number: 1, pieces: [ { owner: 1 } ] });
        let to = fixtures('point', { number: 2, pieces: [ ] });
        let gameState = fixtures('gameState', { 
          current_phase: 'move', 
          dice: [ { number: 1 }, { number: 2 } ], 
          points: [
            { number: 1, pieces: [ { owner: 1 } ] },
            { number: 2, pieces: [ ] }
          ]
        });
        let move = fixtures('move', { from: from, to: to, gameState: gameState });

        expect(move.dieNumber()).toEqual(1);
      });
    });

    describe('with dice not matching distance', () => {
      it('returns the highest unused die number', () => {
        let from = fixtures('point', { number: 1, pieces: [ { owner: 1 } ] });
        let to = fixtures('point', { number: 4, pieces: [ ] });
        let gameState = fixtures('gameState', { 
          current_phase: 'move', 
          dice: [ { number: 2 }, { number: 3, used: true } ], 
          points: [
            { number: 1, pieces: [ { owner: 1 } ] },
            { number: 2, pieces: [ ] },
            { number: 3, pieces: [ ] },
            { number: 4, pieces: [ ] }
          ]
        });
        let move = fixtures('move', { from: from, to: to, gameState: gameState });

        expect(move.dieNumber()).toEqual(2);
      });
    });
  });

  describe('details', () => {
    it('returns from and to', () => {
      let from = fixtures('point', { number: 1, pieces: [ { owner: 1 } ] });
      let to = fixtures('point', { number: 4, pieces: [ ] });
      let move = fixtures('move', { from: from, to: to });

      expect(move.details()).toEqual({ from: 1, to: 4 });
    });
  });

  describe('complete', () => {
    describe('without from', () => {
      it('returns false', () => {
        let from = null;
        let to = fixtures('point', { number: 4, pieces: [ ] });
        let move = fixtures('move', { from: from, to: to });

        expect(move.complete()).toBe(false);
      });
    });

    describe('without to', () => {
      it('returns false', () => {
        let from = fixtures('point', { number: 1, pieces: [ { owner: 1 } ] });
        let to = null;
        let move = fixtures('move', { from: from, to: to });
  
        expect(move.complete()).toBe(false);
      });
    });

    describe('number of moves does not match number of dice', () => {
      it('returns false', () => {
        let from = fixtures('point', { number: 1, pieces: [ { owner: 1 } ] });
        let to = fixtures('point', { number: 2, pieces: [ ] });
        let gameState = fixtures('gameState', { 
          current_phase: 'move', 
          dice: [ { number: 1 }, { number: 1 } ], 
          points: [
            { number: 1, pieces: [ { owner: 1 } ] },
            { number: 2, pieces: [ ] },
            { number: 3, pieces: [ { owner: 1 } ] },
            { number: 4, pieces: [ ] }
          ]
        });
        let move = fixtures('move', { 
          from: from, 
          to: to, 
          moveList: [],
          gameState: gameState 
        });

        expect(move.complete()).toBe(false);
      });
    });

    describe('number of moves match number of dice', () => {
      it('returns true', () => {
        let from = fixtures('point', { number: 1, pieces: [ { owner: 1 } ] });
        let to = fixtures('point', { number: 2, pieces: [ ] });
        let gameState = fixtures('gameState', { 
          current_phase: 'move', 
          dice: [ { number: 1 }, { number: 1 } ], 
          points: [
            { number: 1, pieces: [ { owner: 1 } ] },
            { number: 2, pieces: [ ] },
            { number: 3, pieces: [ { owner: 1 } ] },
            { number: 4, pieces: [ ] }
          ]
        });
        let move = fixtures('move', { 
          from: from, 
          to: to, 
          moveList: [ { from: 3, to: 4 } ],
          gameState: gameState 
        });

        expect(move.complete()).toBe(true);
      });
    });
  });

  describe('allPiecesOffBoard', () => {
    describe('number of moves matches number of pieces on board', () => {
      it('returns true', () => {
        let from = fixtures('point', { number: 24, pieces: [ { owner: 1 } ] });
        let to = fixtures('offBoard', { pieces: [ ] });
        let gameState = fixtures('gameState', { 
          current_phase: 'move', 
          dice: [ { number: 1 }, { number: 2, used: true } ], 
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
            { number: 23, pieces: [ { owner: 1 } ] },
            { number: 24, pieces: [ { owner: 1 } ] }
          ]
        });
        let move = fixtures('move', { 
          from: from, 
          to: to, 
          user: { playerNumber: 1 },
          moveList: [ { from: 23, to: 'off_board' } ],
          gameState: gameState 
        });

        expect(move.allPiecesOffBoard()).toBe(true);
      });
    });

    describe('number of moves does not match number of pieces on board', () => {
      it('returns false', () => {
        let from = fixtures('point', { number: 24, pieces: [ { owner: 1 } ] });
        let to = fixtures('offBoard', { pieces: [ ] });
        let gameState = fixtures('gameState', { 
          current_phase: 'move', 
          dice: [ { number: 1 }, { number: 2, used: true } ], 
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
            { number: 23, pieces: [ { owner: 1 } ] },
            { number: 24, pieces: [ { owner: 1 } ] }
          ]
        });
        let move = fixtures('move', { 
          from: from, 
          to: to, 
          user: { playerNumber: 1 },
          moveList: [ ],
          gameState: gameState 
        });

        expect(move.allPiecesOffBoard()).toBe(false);
      });
    });
  });

  describe('completeMoveList', () => {
    it('returns the list with the proposed move', () => {
        let from = fixtures('point', { number: 23, pieces: [ { owner: 1 } ] });
        let to = fixtures('point', { number: 24, pieces: [ ] });
        let move = fixtures('move', { 
          from: from, 
          to: to, 
          moveList: [ { from: 1, to: 2 } ]
        });

        expect(move.completeMoveList()).toEqual([
          { from: 1, to: 2 },
          { from: 23, to: 24 }
        ]);
    });
  });
});
