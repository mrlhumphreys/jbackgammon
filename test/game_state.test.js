import GameState from '../src/game_state'
import fixtures from './fixtures'

describe('Game State', () => {
  describe('with a point selected', () => {
    it('must be selected', () => {
      let gameState = fixtures('pointSelectedGameState');
      expect(gameState.selectedPoint().number).toBe(1);
    });
  });

  describe('without a point selected', () => {
    it('must not be selected', () => {
      let gameState = fixtures('gameState');
      expect(gameState.selectedPoint()).toBe(null);
    });
  });

  describe('findPoint', () => {
    it('must find the point with the specified number', () => { 
      let gameState = fixtures('gameState');
      expect(gameState.findPoint(1).number).toBe(1);
    });

    it('must find the bar', () => {
      let gameState = new fixtures('gameState');
      expect(gameState.findPoint('bar').constructorName).toBe('Bar');
    });

    it('must find the off board', () => {
      let gameState = new fixtures('gameState');
      expect(gameState.findPoint('off_board').constructorName).toBe('OffBoard');
    });
  });

  describe('move', () => {
    it('must remove a piece from the from and put it on to', () => {
      let gameState = new fixtures('gameState');
      gameState.move(1, 2);
      expect(gameState.findPoint(1).pieces.length).toEqual(1);
      expect(gameState.findPoint(2).pieces.length).toEqual(1);
    });

    describe('to a blot', () => {
      it('must put the piece from to onto the bar', () => {
        let gameState = fixtures('blotGameState');
        gameState.move(1, 2);
        expect(gameState.bar.pieces.length).toEqual(1);
      });
    });

    describe('to off board', () => {
      it('must put the piece off board', () => {
        let gameState = fixtures('bearOffGameState');
        gameState.move(19, 'off_board');
        expect(gameState.offBoard.pieces.length).toEqual(1);
      });
    });
  });

  describe('deselect', () => {
    it('must deselect the selected point', () => {
      let gameState = fixtures('pointSelectedGameState');
      gameState.deselect();
      expect(gameState.selectedPoint()).toBe(null);
    });
  });

  describe('a game where the player is blocked', () => {
    it('must have no moves', () => {
      let gameState = fixtures('blockedGameState');
      expect(gameState.noMovesForPlayer(1)).toBe(true);
    });
  });

  describe('a game where the player is blocked and can bear off', () => {
    it('must have moves', () => { 
      let gameState = fixtures('bearOffGameState');
      expect(gameState.noMovesForPlayer(1)).toBe(false);
    });
  });

  describe('a game where a player has all pieces off board', () => {
    it('must have all pieces off board', () => {
      let gameState = fixtures('allPiecesOffBoardGameState');
      expect(gameState.allPiecesOffBoard()).toBe(true);
    });
  });

  describe('movePossible', () => {
    it('must return the result from move', () => {
      let gameState = fixtures('gameState', {
        current_phase: 'move',
        dice: [
          { number: 1 },
          { number: 1 } 
        ]
      });
      let fromId = 1;
      let user = { playerNumber: 1 };

      expect(gameState.movePossible(fromId, user)).toBe(true);
    }); 
  });

  describe('moveValid', () => {
    it('must return the result from move', () => {
      let gameState = fixtures('gameState', {
        current_phase: 'move',
        dice: [
          { number: 1 },
          { number: 1 }
        ]
      });
      let fromId = 1;
      let toId = 2;
      let moveList = [];
      let user = { playerNumber: 1 };

      expect(gameState.moveValid(fromId, toId, moveList, user)).toBe(true);
    });
  });

  describe('moveComplete', () => {
    it('must return the result from move', () => {
      let gameState = fixtures('gameState', {
        current_phase: 'move',
        dice: [
          { number: 1 },
          { number: 1 }
        ]
      });
      let fromId = 1;
      let toId = 2;
      let moveList = [{from: 1, to: 2}];
      let user = { playerNumber: 1 };

      expect(gameState.moveComplete(fromId, toId, moveList, user)).toBe(true);
    });
  });

  describe('moveDieNumber', () => {
    it('must return the result from move', () => {
      let gameState = fixtures('gameState', {
        current_phase: 'move',
        dice: [
          { number: 1 },
          { number: 1 }
        ]
      });
      let fromId = 1;
      let toId = 2;
      let user = { playerNumber: 1 };
      
      expect(gameState.moveDieNumber(fromId, toId, user)).toEqual(1);
    });
  });

  describe('moveDetails', () => {
    it('must return the result from move', () => {
      let gameState = fixtures('gameState', {
        current_phase: 'move',
        dice: [
          { number: 1 },
          { number: 1 }
        ]
      });
      let fromId = 1;
      let toId = 2;

      expect(gameState.moveDetails(fromId, toId)).toEqual({from: 1, to: 2});
    });
  });

  describe('moveAllPiecesOffBoard', () => {
    it('must return the result from move', () => {
      let gameState = fixtures('gameState', {
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
      });
      let moveList = [ { from: 1, to: 2 } ] 
      let user = { playerNumber: 1 }; 

      expect(gameState.moveAllPiecesOffBoard(moveList, user)).toBe(true);
    });
  });

  describe('moveCompleteMoveList', () => {
    it('must return the result from move', () => {
      let gameState = fixtures('gameState', { 
        current_phase: 'move',
        dice: [
          { number: 1 },
          { number: 1 }
        ]
      });
      let fromId = 1;
      let toId = 2;
      let moveList = [{ from: 1, to: 2 }];
      expect(gameState.moveCompleteMoveList(fromId, toId, moveList)).toEqual([{from: 1, to: 2}, {from: 1, to: 2}]);
    });
  });

  describe('moveErrorMessage', () => {
    it('must return the result from move', () => {
      let gameState = fixtures('gameState', {
        current_phase: 'move',
        dice: [
          { number: 1 },
          { number: 1 }
        ]
      });
      let fromId = 2;
      let user = { playerNumber: 1 };
      expect(gameState.moveErrorMessage(fromId, user)).toEqual('That point is empty.');
    });
  });

  describe('selectBar', () => {
    it('must mark the bar as selected', () => {
      let gameState = fixtures('gameState');
      gameState.selectBar(); 
      expect(gameState.bar.selected).toBe(true);
    });
  });

  describe('selectPoint', () => {
    describe('with a point that exists', () => {
      it('must select the point', () => {
        let gameState = fixtures('gameState');
        gameState.selectPoint(1);
        let point = gameState.findPoint(1);
        expect(gameState.selectedPoint()).toEqual(point);
      });
    });

    describe('with a point that does not exist', () => {
      it('must not do anything', () => {
        let gameState = fixtures('gameState');
        gameState.selectPoint(27);
        expect(gameState.selectedPoint()).toBe(null);
      });
    });
  });

  describe('deselect', () => {
    describe('with point selected', () => {
      it('must deselect point', () => {
        let gameState = fixtures('pointSelectedGameState');
        gameState.deselect();
        expect(gameState.selectedPoint()).toBe(null);
      });
    });

    describe('with bar selected', () => {
      it('must deselect bar', () => {
        let gameState = fixtures('gameState', {
          bar: {
            selected: true
          }
        });
        gameState.deselect();
        expect(gameState.bar.selected).toBe(false);
      });
    });
  });

  describe('move', () => {
    describe('from point to point', () => {
      it('must move the piece', () => {
        let gameState = fixtures('gameState', {
          current_phase: 'move',
          dice: [
            { number: 1 },
            { number: 2 }
          ],
          points: [
            { number: 1, pieces: [ {owner: 1}, {owner: 1} ] },
            { number: 2, pieces: [ ] },
            { number: 3, pieces: [ ] }
          ]
        });
        let fromId = 1;
        let toId = 2;
        let playerNumber = 1;

        gameState.move(fromId, toId, playerNumber);

        let from = gameState.findPoint(fromId);
        let to = gameState.findPoint(toId);

        expect(from.pieces.length).toEqual(1);      
        expect(to.pieces.length).toEqual(1);      
      });
    });

    describe('from bar to point', () => {
      it('must move the piece', () => {
        let gameState = fixtures('gameState', {
          current_phase: 'move',
          bar: {
            pieces: [{owner: 1}]
          },
          dice: [
            { number: 1 },
            { number: 2 }
          ],
          points: [
            { number: 1, pieces: [ {owner: 1}, {owner: 1} ] },
            { number: 2, pieces: [ ] },
            { number: 3, pieces: [ ] }
          ]
        });
        let fromId = 'bar';
        let toId = 1;
        let playerNumber = 1;

        gameState.move(fromId, toId, playerNumber);

        let from = gameState.findPoint(fromId);
        let to = gameState.findPoint(toId);

        expect(from.pieces.length).toEqual(0);      
        expect(to.pieces.length).toEqual(3);      
      });
    });

    describe('from point to off board', () => {
      it('must move the piece', () => {
        let gameState = fixtures('gameState', {
          current_phase: 'move',
          dice: [
            { number: 1 },
            { number: 2 }
          ],
          points: [
            { number: 22, pieces: [ ] },
            { number: 23, pieces: [ ] },
            { number: 24, pieces: [ {owner: 1}, {owner: 1} ] }
          ]
        });
        let fromId = 24;
        let toId = 'off_board';
        let playerNumber = 1;

        gameState.move(fromId, toId, playerNumber);

        let from = gameState.findPoint(fromId);
        let to = gameState.findPoint(toId);

        expect(from.pieces.length).toEqual(1);      
        expect(to.pieces.length).toEqual(1);      
      });
    });

    describe('to an enemy blot', () => {
      it('must move the piece', () => {
        let gameState = fixtures('gameState', {
          current_phase: 'move',
          dice: [
            { number: 1 },
            { number: 2 }
          ],
          points: [
            { number: 1, pieces: [ {owner: 1}, {owner: 1} ] },
            { number: 2, pieces: [ {owner: 2} ] },
            { number: 3, pieces: [ ] }
          ]
        });
        let fromId = 1;
        let toId = 2;
        let playerNumber = 1;

        gameState.move(fromId, toId, playerNumber);

        let from = gameState.findPoint(fromId);
        let to = gameState.findPoint(toId);

        expect(from.pieces.length).toEqual(1);      
        expect(to.pieces.length).toEqual(1);      
      });

      it('must move the blot to bar', () => {
        let gameState = fixtures('gameState', {
          current_phase: 'move',
          dice: [
            { number: 1 },
            { number: 2 }
          ],
          points: [
            { number: 1, pieces: [ {owner: 1}, {owner: 1} ] },
            { number: 2, pieces: [ {owner: 2} ] },
            { number: 3, pieces: [ ] }
          ]
        });
        let fromId = 1;
        let toId = 2;
        let playerNumber = 1;

        gameState.move(fromId, toId, playerNumber);

        let from = gameState.findPoint(fromId);
        let to = gameState.findPoint(toId);
        
        expect(gameState.bar.pieces.length).toEqual(1);      
      });
    });
  });

  describe('useDie', () => {
    describe('when there is a die with that number', () => {
      it('must use the specified die', () => {
        let gameState = fixtures('pointSelectedGameState');
        gameState.useDie(1);
        expect(gameState.dice.findByNumber(1).used).toBe(true);
      });
    });

    describe('when there is no die with that number', () => {
      it('must use the highest die', () => {
        let gameState = fixtures('pointSelectedGameState');
        gameState.useDie(3);
        expect(gameState.dice.findByNumber(6).used).toBe(true);
      });
    });
  });
});
