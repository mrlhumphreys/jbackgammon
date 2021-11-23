import { exists } from '../src/utils'
import Move from '../src/move'
import Bar from '../src/bar'
import OffBoard from '../src/off_board'
import Point from '../src/point'
import PointSet from '../src/point_set'
import GameState from '../src/game_state'
import Match from '../src/match'

const fixtureDefinitions = {
  bar: {
    klass: Bar,
    args: { pieces: [] } 
  },
  gameState: {
    klass: GameState,
    args: {
      "current_player_number": 1,
      "current_phase": "move",
      "dice": [
        { "number": null },
        { "number": null }
      ],
      "bar": { "pieces": [] },
      "points": [
        { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
        { "number": 2, "pieces": [] },
        { "number": 3, "pieces": [] },
        { "number": 4, "pieces": [] },
        { "number": 5, "pieces": [] },
        { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
        { "number": 7, "pieces": [] },
        { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
        { "number": 9, "pieces": [] },
        { "number": 10, "pieces": [] },
        { "number": 11, "pieces": [] },
        { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
        { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
        { "number": 14, "pieces": [] },
        { "number": 15, "pieces": [] },
        { "number": 16, "pieces": [] },
        { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
        { "number": 18, "pieces": [] },
        { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
        { "number": 20, "pieces": [] },
        { "number": 21, "pieces": [] },
        { "number": 22, "pieces": [] },
        { "number": 23, "pieces": [] },
        { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
      ],
      "off_board": { "pieces": [] }
    }
  },
  playerOneWinsGameState: {
    klass: GameState,
    args: {
      "current_player_number": 1,
      "current_phase": "move",
      "dice": [
        { "number": null },
        { "number": null }
      ],
      "bar": { "pieces": [] },
      "points": [
        { "number": 1, "pieces": [] },
        { "number": 2, "pieces": [] },
        { "number": 3, "pieces": [] },
        { "number": 4, "pieces": [] },
        { "number": 5, "pieces": [] },
        { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
        { "number": 7, "pieces": [] },
        { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
        { "number": 9, "pieces": [] },
        { "number": 10, "pieces": [] },
        { "number": 11, "pieces": [] },
        { "number": 12, "pieces": [] },
        { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
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
        { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
      ],
      "off_board": { 
        "pieces": [
           { player_number: 1 },
           { player_number: 1 },
           { player_number: 1 },
           { player_number: 1 },
           { player_number: 1 },
           { player_number: 1 },
           { player_number: 1 },
           { player_number: 1 },
           { player_number: 1 },
           { player_number: 1 },
           { player_number: 1 },
           { player_number: 1 },
           { player_number: 1 },
           { player_number: 1 },
           { player_number: 1 } 
         ] 
      }
    }
  },
  playerTwoWinsGameState: {
    klass: GameState,
    args: {
      "current_player_number": 1,
      "current_phase": "move",
      "dice": [
        { "number": null },
        { "number": null }
      ],
      "bar": { "pieces": [] },
      "points": [
        { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
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
        { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
        { "number": 13, "pieces": [] },
        { "number": 14, "pieces": [] },
        { "number": 15, "pieces": [] },
        { "number": 16, "pieces": [] },
        { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
        { "number": 18, "pieces": [] },
        { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
        { "number": 20, "pieces": [] },
        { "number": 21, "pieces": [] },
        { "number": 22, "pieces": [] },
        { "number": 23, "pieces": [] },
        { "number": 24, "pieces": [] }
      ],
      "off_board": { 
        "pieces": [
          { player_number: 2 }, 
          { player_number: 2 }, 
          { player_number: 2 }, 
          { player_number: 2 }, 
          { player_number: 2 }, 
          { player_number: 2 }, 
          { player_number: 2 }, 
          { player_number: 2 }, 
          { player_number: 2 }, 
          { player_number: 2 }, 
          { player_number: 2 }, 
          { player_number: 2 }, 
          { player_number: 2 }, 
          { player_number: 2 }, 
          { player_number: 2 } 
        ]
      }
    }
  },
  pointSelectedGameState: {
    klass: GameState,
    args: {
      "current_player_number": 1,
      "current_phase": "move",
      "dice": [
        { "number": 1 },
        { "number": 6 }
      ],
      "bar": { "pieces": [] },
      "points": [
        { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ], "selected": true },
        { "number": 2, "pieces": [] },
        { "number": 3, "pieces": [] },
        { "number": 4, "pieces": [] },
        { "number": 5, "pieces": [] },
        { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
        { "number": 7, "pieces": [] },
        { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
        { "number": 9, "pieces": [] },
        { "number": 10, "pieces": [] },
        { "number": 11, "pieces": [] },
        { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
        { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
        { "number": 14, "pieces": [] },
        { "number": 15, "pieces": [] },
        { "number": 16, "pieces": [] },
        { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
        { "number": 18, "pieces": [] },
        { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
        { "number": 20, "pieces": [] },
        { "number": 21, "pieces": [] },
        { "number": 22, "pieces": [] },
        { "number": 23, "pieces": [] },
        { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
      ],
      "off_board": { "pieces": [] }
    }
  },
  blotGameState: {
    klass: GameState,
    args: {
      "current_player_number": 1,
      "current_phase": "move",
      "dice": [
        { "number": 1 },
        { "number": 2 }
      ],
      "bar": { "pieces": [] },
      "points": [
        { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ], "selected": true },
        { "number": 2, "pieces": [ { "player_number": 2 } ] },
        { "number": 3, "pieces": [] },
        { "number": 4, "pieces": [] },
        { "number": 5, "pieces": [] },
        { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
        { "number": 7, "pieces": [] },
        { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
        { "number": 9, "pieces": [] },
        { "number": 10, "pieces": [] },
        { "number": 11, "pieces": [] },
        { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
        { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
        { "number": 14, "pieces": [] },
        { "number": 15, "pieces": [] },
        { "number": 16, "pieces": [] },
        { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
        { "number": 18, "pieces": [] },
        { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
        { "number": 20, "pieces": [] },
        { "number": 21, "pieces": [] },
        { "number": 22, "pieces": [] },
        { "number": 23, "pieces": [] },
        { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
      ],
      "off_board": { "pieces": [] }
    }
  },
  blockedGameState: {
    klass: GameState,
    args: {
      "current_player_number": 1,
      "current_phase": "move",
      "dice": [
        { "number": 1 },
        { "number": 2 }
      ],
      "bar": { "pieces": [] },
      "points": [
        { "number": 1, "pieces": [ { "player_number": 1 } ] },
        { "number": 2, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] },
        { "number": 3, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] },
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
    }
  },
  bearOffGameState: {
    klass: GameState,
    args: {
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
        { "number": 19, "pieces": [{ "player_number": 1 }, { "player_number": 1 }] },
        { "number": 20, "pieces": [{ "player_number": 1 }, { "player_number": 1 }] },
        { "number": 21, "pieces": [] },
        { "number": 22, "pieces": [] },
        { "number": 23, "pieces": [] },
        { "number": 24, "pieces": [] }
      ],
      "off_board": { "pieces": [] }
    }
  },
  allPiecesOffBoardGameState: {
    klass: GameState,
    args: {
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
        { "number": 19, "pieces": [{ "player_number": 2 }, { "player_number": 2 }] },
        { "number": 20, "pieces": [{ "player_number": 2 }, { "player_number": 2 }] },
        { "number": 21, "pieces": [] },
        { "number": 22, "pieces": [] },
        { "number": 23, "pieces": [] },
        { "number": 24, "pieces": [] }
      ],
      "off_board": {
        "pieces": [
          { "player_number": 1 },
          { "player_number": 1 },
          { "player_number": 1 },
          { "player_number": 1 },
          { "player_number": 1 },
          { "player_number": 1 },
          { "player_number": 1 },
          { "player_number": 1 },
          { "player_number": 1 },
          { "player_number": 1 },
          { "player_number": 1 },
          { "player_number": 1 },
          { "player_number": 1 },
          { "player_number": 1 },
          { "player_number": 1 }
        ]
      }
    }
  },
  match: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": null },
          { "number": null }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
        ],
        "off_board": { "pieces": [] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    } 
  },
  usedDiceMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        dice: [ { number: 2 }, { number: 3, used: true } ], 
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ], selected: true },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
        ],
        "off_board": { "pieces": [] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  diceMismatchMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1 },
          { "number": 2 }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [ { player_number: 1 }, { player_number: 1 }] },
          { "number": 22, "pieces": [ { player_number: 1 }, { onwer: 1 }, { player_number: 1 }, { player_number: 1 } ] },
          { "number": 23, "pieces": [ { player_number: 2 }, { player_number: 2 } ] },
          { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
        ],
        "off_board": { 
          "pieces": [
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 }
          ] 
        }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  diceMismatchSelectedMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1 },
          { "number": 2 }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [ { player_number: 1 }, { player_number: 1 }] },
          { "number": 22, "pieces": [ { player_number: 1 }, { onwer: 1 }, { player_number: 1 }, { player_number: 1 } ], selected: true },
          { "number": 23, "pieces": [ { player_number: 2 }, { player_number: 2 } ] },
          { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
        ],
        "off_board": { 
          "pieces": [
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 }
          ] 
        }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  piecesNotHomeMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1 },
          { "number": 1 }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [ { player_number: 2 }, { player_number: 2 } ] },
          { "number": 24, "pieces": [ { player_number: 1 }, { player_number: 1 } ] }
        ],
        "off_board": { "pieces": [] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  piecesNotHomeSelectedMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1 },
          { "number": 1 }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [ { player_number: 2 }, { player_number: 2 } ] },
          { "number": 24, "pieces": [ { player_number: 1 }, { player_number: 1 } ], selected: true }
        ],
        "off_board": { "pieces": [] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  bearingOffMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 2,
        "current_phase": "move",
        "dice": [
          { "number": 6, used: false },
          { "number": 6, used: false },
          { "number": 6, used: false },
          { "number": 6, used: false }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [ { player_number: 2 }, { player_number: 2 } ] },
          { "number": 4, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 5, "pieces": [ { player_number: 2 } ] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [] },
          { "number": 13, "pieces": [] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [ { player_number: 1 }, { player_number: 1 } ] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { player_number: 1 }, { player_number: 1 }  ] },
          { "number": 18, "pieces": [ { player_number: 1 }, { player_number: 1 } ] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [] }
        ],
        "off_board": { "pieces": [ { player_number: 2 } ] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  bearingOffCompletedMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 2,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: true },
          { "number": 6, used: false },
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [ { player_number: 2 }, { player_number: 2 } ] },
          { "number": 4, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 5, "pieces": [ { player_number: 2 } ] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ], selected: true },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [] },
          { "number": 13, "pieces": [] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [ { player_number: 1 }, { player_number: 1 } ] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { player_number: 1 }, { player_number: 1 }  ] },
          { "number": 18, "pieces": [ { player_number: 1 }, { player_number: 1 } ] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [] }
        ],
        "off_board": { "pieces": [ { player_number: 2 } ] }
      },
      move_list: [
        { from: 4, to: 3 }
      ],
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  bearingOffIncompleteMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 2,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: false },
          { "number": 6, used: false },
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [ { player_number: 2 }, { player_number: 2 } ] },
          { "number": 4, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 5, "pieces": [ { player_number: 2 } ] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ], selected: true },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [] },
          { "number": 13, "pieces": [] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [ { player_number: 1 }, { player_number: 1 } ] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { player_number: 1 }, { player_number: 1 }  ] },
          { "number": 18, "pieces": [ { player_number: 1 }, { player_number: 1 } ] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [] }
        ],
        "off_board": { "pieces": [ { player_number: 2 } ] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  bearingOffOnlyOnePieceMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 2,
        "current_phase": "move",
        "dice": [
          { "number": 5, used: false },
          { "number": 6, used: false },
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [ { player_number: 2 } ], selected: true },
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
          { "number": 16, "pieces": [ { player_number: 1 }, { player_number: 1 } ] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { player_number: 1 }, { player_number: 1 }  ] },
          { "number": 18, "pieces": [ { player_number: 1 }, { player_number: 1 } ] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [] }
        ],
        "off_board": { "pieces": [ 
          { player_number: 2 },
          { player_number: 2 },
          { player_number: 2 },
          { player_number: 2 },
          { player_number: 2 },
          { player_number: 2 },
          { player_number: 2 },
          { player_number: 2 },
          { player_number: 2 },
          { player_number: 2 },
          { player_number: 2 },
          { player_number: 2 },
          { player_number: 2 },
          { player_number: 2 }
        ] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  bearingOffDiceMismatchMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 2,
        "current_phase": "move",
        "dice": [
          { "number": 6, used: false },
          { "number": 6, used: false },
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [ { player_number: 2 }, { player_number: 2 } ] },
          { "number": 4, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 5, "pieces": [ { player_number: 2 } ] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [] },
          { "number": 13, "pieces": [] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [ { player_number: 1 }, { player_number: 1 } ] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { player_number: 1 }, { player_number: 1 }  ] },
          { "number": 18, "pieces": [ { player_number: 1 }, { player_number: 1 } ] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [] }
        ],
        "off_board": { "pieces": [ { player_number: 2 } ] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  bearingOffWithMultipleUsedDiceMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 2,
        "current_phase": "move",
        "dice": [
          { "number": 6, used: true },
          { "number": 6, used: true },
          { "number": 6, used: true },
          { "number": 6, used: false }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [ { player_number: 2 }, { player_number: 2 } ] },
          { "number": 4, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 5, "pieces": [ { player_number: 2 } ] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [] },
          { "number": 13, "pieces": [] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [ { player_number: 1 }, { player_number: 1 } ] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { player_number: 1 }, { player_number: 1 }  ] },
          { "number": 18, "pieces": [ { player_number: 1 }, { player_number: 1 } ] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [] }
        ],
        "off_board": { "pieces": [ { player_number: 2 } ] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    } 
  },
  resignedMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": null },
          { "number": null }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
        ],
        "off_board": { "pieces": [] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: true },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    } 
  },
  winnerMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": null },
          { "number": null }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
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
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 13, "pieces": [] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [] }
        ],
        "off_board": { 
          "pieces": [
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 } 
          ] 
        }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  rollMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "roll",
        "dice": [
          { "number": null },
          { "number": null }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
        ],
        "off_board": { "pieces": [] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  winningRollMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "roll",
        "dice": [
          { "number": null },
          { "number": null }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
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
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 13, "pieces": [] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [] }
        ],
        "off_board": { 
          "pieces": [
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 },
            { player_number: 2 } 
          ] 
        }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
    }
  },
  moveMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: false },
          { "number": 2, used: false }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
        ],
        "off_board": { "pieces": [] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  allDiceUsedMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: true },
          { "number": 2, used: true }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
        ],
        "off_board": { "pieces": [] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  passableMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: true },
          { "number": 2, used: false }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [ { player_number: 1 } ] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
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
          { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
        ],
        "off_board": { 
          "pieces": [ 
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 }
          ] 
        }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  selectedMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: false },
          { "number": 2, used: false }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, selected: true, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
        ],
        "off_board": { "pieces": [] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  blockedSelectedMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: false },
          { "number": 2, used: false }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ], selected: true },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
        ],
        "off_board": { "pieces": [] }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  completedMoveMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: true },
          { "number": 2, used: false }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, selected: true, "pieces": [ { "player_number": 1 } ] },
          { "number": 2, "pieces": [ { "player_number": 1 } ] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
        ],
        "off_board": { "pieces": [] }
      },
      move_list: [
        { from: 1, to: 2 }
      ],
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  incompleteMoveMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: false },
          { "number": 2, used: false }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, selected: true, "pieces": [ { "player_number": 1 }, { player_number: 1 } ] },
          { "number": 2, "pieces": [] },
          { "number": 3, "pieces": [] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 9, "pieces": [] },
          { "number": 10, "pieces": [] },
          { "number": 11, "pieces": [] },
          { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 14, "pieces": [] },
          { "number": 15, "pieces": [] },
          { "number": 16, "pieces": [] },
          { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
          { "number": 18, "pieces": [] },
          { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
          { "number": 20, "pieces": [] },
          { "number": 21, "pieces": [] },
          { "number": 22, "pieces": [] },
          { "number": 23, "pieces": [] },
          { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
        ],
        "off_board": { "pieces": [] }
      },
      move_list: [
      ],
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  allPiecesOffBoardMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: false },
          { "number": 2, used: false }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 2, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 3, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 4, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 5, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
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
          { "number": 24, selected: true, "pieces": [ { player_number: 1 } ] }
        ],
        "off_board": { 
          "pieces": [ 
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 }
          ] 
        }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  almostAllPiecesOffBoardMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: false },
          { "number": 2, used: false }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 2, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 3, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 4, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
          { "number": 5, "pieces": [ { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 }, { player_number: 2 } ] },
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
          { "number": 23, "pieces": [ { player_number: 1 } ] },
          { "number": 24, selected: true, "pieces": [ { player_number: 1 } ] }
        ],
        "off_board": { 
          "pieces": [ 
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 },
            { player_number: 1 }
          ] 
        }
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  moveFromBarMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: false },
          { "number": 2, used: false }
        ],
        "bar": { "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
        "points": [
          { "number": 1, "pieces": [ { "player_number": 2 } ] },
          { "number": 2, "pieces": [ ] },
          { "number": 3, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [] },
          { "number": 7, "pieces": [] },
          { "number": 8, "pieces": [] },
          { "number": 9, "pieces": [ { "player_number": 1 } ] },
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
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  noMovesFromBarMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: false },
          { "number": 2, used: false }
        ],
        "bar": { "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
        "points": [
          { "number": 1, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 2, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 3, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] },
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
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  noMovesMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: false },
          { "number": 2, used: false }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 2, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 3, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] },
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
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  singleMoveMatch: {
    klass: Match,
    args: {
      id: 1,
      game_state: { 
        "current_player_number": 1,
        "current_phase": "move",
        "dice": [
          { "number": 1, used: false },
          { "number": 2, used: true }
        ],
        "bar": { "pieces": [] },
        "points": [
          { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
          { "number": 2, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 3, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] },
          { "number": 4, "pieces": [] },
          { "number": 5, "pieces": [] },
          { "number": 6, "pieces": [ { player_number: 1 } ] },
          { "number": 7, "pieces": [ { player_number: 2 }, { player_number: 2 } ] },
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
      },
      move_list: [
        { from: 4, to: 6 }
      ],
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  move: {
    klass: Move,
    args: {
      from: null,
      to: null,
      moveList: [],
      playerNumber: 1,
      gameState: {},
    }
  },
  offBoard: {
    klass: OffBoard,
    args: {
      pieces: []
    }
  },
  point: {
    klass: Point,
    args: {
      number: 1,
      pieces: [
        { player_number: 1 }
      ]
    }
  },
  pointSet: {
    klass: PointSet,
    args: [ 
      { "number": 1, "pieces": [ { "player_number": 1 }, { "player_number": 1 } ] },
      { "number": 2, "pieces": [] },
      { "number": 3, "pieces": [] },
      { "number": 4, "pieces": [] },
      { "number": 5, "pieces": [] },
      { "number": 6, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
      { "number": 7, "pieces": [] },
      { "number": 8, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
      { "number": 9, "pieces": [] },
      { "number": 10, "pieces": [] },
      { "number": 11, "pieces": [] },
      { "number": 12, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 } ] },
      { "number": 13, "pieces": [ { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 }, { "player_number": 2 } ] },
      { "number": 14, "pieces": [] },
      { "number": 15, "pieces": [] },
      { "number": 16, "pieces": [] },
      { "number": 17, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, ] },
      { "number": 18, "pieces": [] },
      { "number": 19, "pieces": [ { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1 }, { "player_number": 1} ] },
      { "number": 20, "pieces": [] },
      { "number": 21, "pieces": [] },
      { "number": 22, "pieces": [] },
      { "number": 23, "pieces": [] },
      { "number": 24, "pieces": [ { "player_number": 2 }, { "player_number": 2 } ] }
    ]
  } 
};


const deepMerge = function(aObject, bObject) {
  let cObject = {};

  let aObjectKeys = [];
  let bObjectKeys = [];

  if (exists(aObject)) {
    aObjectKeys = Object.keys(aObject);
  }

  if (exists(bObject)) {
    bObjectKeys = Object.keys(bObject);
  }

  let keys = [...new Set([...aObjectKeys, ...bObjectKeys])];

  keys.forEach(function(k) {
    let aValue = undefined;
    let bValue = undefined;

    if (exists(aObject)) {
      aValue = aObject[k];
    }

    if (exists(bObject)) {
      bValue = bObject[k];
    }

    let cValue = undefined;

    if (exists(bValue)) {
      if (bValue.constructor === Object) {
        cValue = deepMerge(aValue, bValue); 
      } else { 
        cValue = bValue;
      }
    } else {
      cValue = aValue;
    }

    cObject[k] = cValue;
  });
  return cObject;
};

const fixtures = function(name, customArgs) {
  let definition = fixtureDefinitions[name];
  let args = undefined;

  if (definition.args.constructor === Array) {
    if (exists(customArgs)) {
      args = customArgs;
    } else {
      args = definition.args;
    }
  } else {
    if (exists(customArgs)) {
      args = deepMerge(definition.args, customArgs);
    } else {
      args = Object.assign({}, definition.args);
    }
  }

  return new definition.klass(args);
};

export default fixtures

