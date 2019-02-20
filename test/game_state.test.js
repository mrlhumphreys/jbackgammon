import GameState from '../src/game_state'

const defaultGameState = {
  "current_player_number": 1,
  "current_phase": "move",
  "dice": [
    { "number": null },
    { "number": null }
  ],
  "bar": { "pieces": [] },
  "points": [
    { "number": 1, "pieces": [ { "owner": 1 }, { "owner": 1 } ] },
    { "number": 2, "pieces": [] },
    { "number": 3, "pieces": [] },
    { "number": 4, "pieces": [] },
    { "number": 5, "pieces": [] },
    { "number": 6, "pieces": [ { "owner": 2 }, { "owner": 2 }, { "owner": 2 }, { "owner": 2 }, { "owner": 2 } ] },
    { "number": 7, "pieces": [] },
    { "number": 8, "pieces": [ { "owner": 2 }, { "owner": 2 }, { "owner": 2 } ] },
    { "number": 9, "pieces": [] },
    { "number": 10, "pieces": [] },
    { "number": 11, "pieces": [] },
    { "number": 12, "pieces": [ { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, { "owner": 1 } ] },
    { "number": 13, "pieces": [ { "owner": 2 }, { "owner": 2 }, { "owner": 2 }, { "owner": 2 }, { "owner": 2 } ] },
    { "number": 14, "pieces": [] },
    { "number": 15, "pieces": [] },
    { "number": 16, "pieces": [] },
    { "number": 17, "pieces": [ { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, ] },
    { "number": 18, "pieces": [] },
    { "number": 19, "pieces": [ { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, { "owner": 1} ] },
    { "number": 20, "pieces": [] },
    { "number": 21, "pieces": [] },
    { "number": 22, "pieces": [] },
    { "number": 23, "pieces": [] },
    { "number": 24, "pieces": [ { "owner": 2 }, { "owner": 2 } ] }
  ],
  "off_board": { "pieces": [] }
};

const pointSelectedGameState = {
  "current_player_number": 1,
  "current_phase": "move",
  "dice": [
    { "number": 1 },
    { "number": 6 }
  ],
  "bar": { "pieces": [] },
  "points": [
    { "number": 1, "pieces": [ { "owner": 1 }, { "owner": 1 } ], "selected": true },
    { "number": 2, "pieces": [] },
    { "number": 3, "pieces": [] },
    { "number": 4, "pieces": [] },
    { "number": 5, "pieces": [] },
    { "number": 6, "pieces": [ { "owner": 2 }, { "owner": 2 }, { "owner": 2 }, { "owner": 2 }, { "owner": 2 } ] },
    { "number": 7, "pieces": [] },
    { "number": 8, "pieces": [ { "owner": 2 }, { "owner": 2 }, { "owner": 2 } ] },
    { "number": 9, "pieces": [] },
    { "number": 10, "pieces": [] },
    { "number": 11, "pieces": [] },
    { "number": 12, "pieces": [ { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, { "owner": 1 } ] },
    { "number": 13, "pieces": [ { "owner": 2 }, { "owner": 2 }, { "owner": 2 }, { "owner": 2 }, { "owner": 2 } ] },
    { "number": 14, "pieces": [] },
    { "number": 15, "pieces": [] },
    { "number": 16, "pieces": [] },
    { "number": 17, "pieces": [ { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, ] },
    { "number": 18, "pieces": [] },
    { "number": 19, "pieces": [ { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, { "owner": 1} ] },
    { "number": 20, "pieces": [] },
    { "number": 21, "pieces": [] },
    { "number": 22, "pieces": [] },
    { "number": 23, "pieces": [] },
    { "number": 24, "pieces": [ { "owner": 2 }, { "owner": 2 } ] }
  ],
  "off_board": { "pieces": [] }
};

const blotGameState = {
  "current_player_number": 1,
  "current_phase": "move",
  "dice": [
    { "number": 1 },
    { "number": 2 }
  ],
  "bar": { "pieces": [] },
  "points": [
    { "number": 1, "pieces": [ { "owner": 1 }, { "owner": 1 } ], "selected": true },
    { "number": 2, "pieces": [ { "owner": 2 } ] },
    { "number": 3, "pieces": [] },
    { "number": 4, "pieces": [] },
    { "number": 5, "pieces": [] },
    { "number": 6, "pieces": [ { "owner": 2 }, { "owner": 2 }, { "owner": 2 }, { "owner": 2 }, { "owner": 2 } ] },
    { "number": 7, "pieces": [] },
    { "number": 8, "pieces": [ { "owner": 2 }, { "owner": 2 }, { "owner": 2 } ] },
    { "number": 9, "pieces": [] },
    { "number": 10, "pieces": [] },
    { "number": 11, "pieces": [] },
    { "number": 12, "pieces": [ { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, { "owner": 1 } ] },
    { "number": 13, "pieces": [ { "owner": 2 }, { "owner": 2 }, { "owner": 2 }, { "owner": 2 }, { "owner": 2 } ] },
    { "number": 14, "pieces": [] },
    { "number": 15, "pieces": [] },
    { "number": 16, "pieces": [] },
    { "number": 17, "pieces": [ { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, ] },
    { "number": 18, "pieces": [] },
    { "number": 19, "pieces": [ { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, { "owner": 1 }, { "owner": 1} ] },
    { "number": 20, "pieces": [] },
    { "number": 21, "pieces": [] },
    { "number": 22, "pieces": [] },
    { "number": 23, "pieces": [] },
    { "number": 24, "pieces": [ { "owner": 2 }, { "owner": 2 } ] }
  ],
  "off_board": { "pieces": [] }
};

const blockedGameState = {
  "current_player_number": 1,
  "current_phase": "move",
  "dice": [
    { "number": 1 },
    { "number": 2 }
  ],
  "bar": { "pieces": [] },
  "points": [
    { "number": 1, "pieces": [ { "owner": 1 } ] },
    { "number": 2, "pieces": [ { "owner": 2 }, { "owner": 2 } ] },
    { "number": 3, "pieces": [ { "owner": 2 }, { "owner": 2 } ] },
    { "number": 4, "pieces": [] },
    { "number": 5, "pieces": [] },
    { "number": 6, "pieces": [] },
    { "number": 7, "pieces": [] },
    { "number": 8, "pieces": [] },
    { "number": 9, "pieces": [] },
    { "number": 10, "pieces": [] },
    { "number": 11, "pieces": [] },
    { "number": 12, "pieces": [] },
    { "number": 13, "pieces": [] },
    { "number": 14, "pieces": [] },
    { "number": 15, "pieces": [] },
    { "number": 16, "pieces": [] },
    { "number": 17, "pieces": [] },
    { "number": 18, "pieces": [] },
    { "number": 19, "pieces": [] },
    { "number": 20, "pieces": [] },
    { "number": 21, "pieces": [] },
    { "number": 22, "pieces": [] },
    { "number": 23, "pieces": [] },
    { "number": 24, "pieces": [] }
  ],
  "off_board": { "pieces": [] }
};

const bearOffGameState = {
  "current_player_number": 1,
  "current_phase": "move",
  "dice": [
    { "number": 6 },
    { "number": 6 }
  ],
  "bar": { "pieces": [] },
  "points": [
    { "number": 1, "pieces": [] },
    { "number": 2, "pieces": [] },
    { "number": 3, "pieces": [] },
    { "number": 4, "pieces": [] },
    { "number": 5, "pieces": [] },
    { "number": 6, "pieces": [] },
    { "number": 7, "pieces": [] },
    { "number": 8, "pieces": [] },
    { "number": 9, "pieces": [] },
    { "number": 10, "pieces": [] },
    { "number": 11, "pieces": [] },
    { "number": 12, "pieces": [] },
    { "number": 13, "pieces": [] },
    { "number": 14, "pieces": [] },
    { "number": 15, "pieces": [] },
    { "number": 16, "pieces": [] },
    { "number": 17, "pieces": [] },
    { "number": 18, "pieces": [] },
    { "number": 19, "pieces": [{ "owner": 1 }, { "owner": 1 }] },
    { "number": 20, "pieces": [{ "owner": 1 }, { "owner": 1 }] },
    { "number": 21, "pieces": [] },
    { "number": 22, "pieces": [] },
    { "number": 23, "pieces": [] },
    { "number": 24, "pieces": [] }
  ],
  "off_board": { "pieces": [] }
};

const allPiecesOffBoardGameState = {
  "current_player_number": 1,
  "current_phase": "move",
  "dice": [
    { "number": 6 },
    { "number": 6 }
  ],
  "bar": { "pieces": [] },
  "points": [
    { "number": 1, "pieces": [] },
    { "number": 2, "pieces": [] },
    { "number": 3, "pieces": [] },
    { "number": 4, "pieces": [] },
    { "number": 5, "pieces": [] },
    { "number": 6, "pieces": [] },
    { "number": 7, "pieces": [] },
    { "number": 8, "pieces": [] },
    { "number": 9, "pieces": [] },
    { "number": 10, "pieces": [] },
    { "number": 11, "pieces": [] },
    { "number": 12, "pieces": [] },
    { "number": 13, "pieces": [] },
    { "number": 14, "pieces": [] },
    { "number": 15, "pieces": [] },
    { "number": 16, "pieces": [] },
    { "number": 17, "pieces": [] },
    { "number": 18, "pieces": [] },
    { "number": 19, "pieces": [{ "owner": 2 }, { "owner": 2 }] },
    { "number": 20, "pieces": [{ "owner": 2 }, { "owner": 2 }] },
    { "number": 21, "pieces": [] },
    { "number": 22, "pieces": [] },
    { "number": 23, "pieces": [] },
    { "number": 24, "pieces": [] }
  ],
  "off_board": {
    "pieces": [
      { "owner": 1 },
      { "owner": 1 },
      { "owner": 1 },
      { "owner": 1 },
      { "owner": 1 },
      { "owner": 1 },
      { "owner": 1 },
      { "owner": 1 },
      { "owner": 1 },
      { "owner": 1 },
      { "owner": 1 },
      { "owner": 1 },
      { "owner": 1 },
      { "owner": 1 },
      { "owner": 1 }
    ]
  }
};

describe('Game State', () => {
  describe('with a point selected', () => {
    it('must be selected', () => {
      let gameState = new GameState(pointSelectedGameState);
      expect(gameState.selectedPoint().number).toBe(1);
    });
  });

  describe('without a point selected', () => {
    it('must not be selected', () => {
      let gameState = new GameState(defaultGameState);
      expect(gameState.selectedPoint()).toBe(null);
    });
  });

  describe('findPoint', () => {
    it('must find the point with the specified number', () => { 
      let gameState = new GameState(defaultGameState);
      expect(gameState.findPoint(1).number).toBe(1);
    });

    it('must find the bar', () => {
      let gameState = new GameState(defaultGameState);
      expect(gameState.findPoint('bar').constructorName).toBe('Bar');
    });

    it('must find the off board', () => {
      let gameState = new GameState(defaultGameState);
      expect(gameState.findPoint('off_board').constructorName).toBe('OffBoard');
    });
  });

  describe('move', () => {
    it('must remove a piece from the from and put it on to', () => {
      let gameState = new GameState(defaultGameState);
      gameState.move(1, 2);
      expect(gameState.findPoint(1).pieces.length).toEqual(1);
      expect(gameState.findPoint(2).pieces.length).toEqual(1);
    });

    describe('to a blot', () => {
      it('must put the piece from to onto the bar', () => {
        let gameState = new GameState(blotGameState);
        gameState.move(1, 2);
        expect(gameState.bar.pieces.length).toEqual(1);
      });
    });

    describe('to off board', () => {
      it('must put the piece off board', () => {
        let gameState = new GameState(bearOffGameState);
        gameState.move(19, 'off_board');
        expect(gameState.offBoard.pieces.length).toEqual(1);
      });
    });
  });

  describe('deselect', () => {
    it('must deselect the selected point', () => {
      let gameState = new GameState(pointSelectedGameState);
      gameState.deselect();
      expect(gameState.selectedPoint()).toBe(null);
    });
  });

  describe('useDie', () => {
    describe('when there is a die with that number', () => {
      it('must use the specified die', () => {
        let gameState = new GameState(pointSelectedGameState);
        gameState.useDie(1);
        expect(gameState.dice.findByNumber(1).used).toBe(true);
      });
    });

    describe('when there is no die with that number', () => {
      it('must use the highest die', () => {
        let gameState = new GameState(pointSelectedGameState);
        gameState.useDie(3);
        expect(gameState.dice.findByNumber(6).used).toBe(true);
      });
    });
  });

  describe('a game where the player is blocked', () => {
    it('must have no moves', () => {
      let gameState = new GameState(blockedGameState);
      expect(gameState.noMovesForPlayer(1)).toBe(true);
    });
  });

  describe('a game where the player is blocked and can bear off', () => {
    it('must have moves', () => { 
      let gameState = new GameState(bearOffGameState);
      expect(gameState.noMovesForPlayer(1)).toBe(false);
    });
  });

  describe('a game where a player has all pieces off board', () => {
    it('must have all pieces off board', () => {
      let gameState = new GameState(allPiecesOffBoardGameState);
      expect(gameState.allPiecesOffBoard()).toBe(true);
    });
  });
});
