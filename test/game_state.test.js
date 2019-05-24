import GameState from '../src/game_state'
import fixtures from './fixtures'

describe('Game State', () => {
  describe('asJson', () => {
    it('must serialize game state as json', () => {
      let gameState = fixtures('gameState');
      expect(gameState.asJson).toEqual({
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
      });
    });
  });

  describe('with a point selected', () => {
    it('must be selected', () => {
      let gameState = fixtures('pointSelectedGameState');
      expect(gameState.selectedPoint.number).toBe(1);
    });
  });

  describe('without a point selected', () => {
    it('must not be selected', () => {
      let gameState = fixtures('gameState');
      expect(gameState.selectedPoint).toBe(null);
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
      expect(gameState.selectedPoint).toBe(null);
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
      expect(gameState.allPiecesOffBoard).toBe(true);
    });
  });

  describe('select', () => {
    describe('bar', () => {
      it('must select the bar', () => {
        let gameState = fixtures('gameState');
        gameState.select('bar');
        expect(gameState.bar.selected).toBe(true);
      });
    });

    describe('point', () => {
      it('must select the point', () => {
        let gameState = fixtures('gameState');
        gameState.select(1);
        let point = gameState.findPoint(1);
        expect(point.selected).toBe(true);
      });
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
        expect(gameState.selectedPoint).toEqual(point);
      });
    });

    describe('with a point that does not exist', () => {
      it('must not do anything', () => {
        let gameState = fixtures('gameState');
        gameState.selectPoint(27);
        expect(gameState.selectedPoint).toBe(null);
      });
    });
  });

  describe('deselect', () => {
    describe('with point selected', () => {
      it('must deselect point', () => {
        let gameState = fixtures('pointSelectedGameState');
        gameState.deselect();
        expect(gameState.selectedPoint).toBe(null);
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

  describe('passTurn', () => {
    describe('when current turn is player 1', () => {
      it('passes the turn to player 2', () => {
        let gameState = fixtures('gameState', { current_player_number: 1});
        gameState.passTurn();
        expect(gameState.currentPlayerNumber).toEqual(2);
      });
    });

    describe('when current turn is player 2', () => {
      it('passes the turn to player 1', () => {
        let gameState = fixtures('gameState', { current_player_number: 2});
        gameState.passTurn();
        expect(gameState.currentPlayerNumber).toEqual(1);
      });
    });
  });
});
