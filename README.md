# JBackgammon

A backgammon game state and validation library written in Javascript.

## Installation

Install via npm:

  $ npm install @mrlhumphreys/jbackgammon

## Usage

ES5:

```javascript
  var Match = require('@mrlhumphreys/jbackgammon').Match;
```

ES6:

```javascript
  import { Match } from '@mrlhumphreys/jbackgammon'
```

Initialize a new match object:

```javascript 
  var match = new Match({
    id: 1,
    game_state: {
      bar: {
        pieces: []
      },
      current_player_number: 1,
      current_phase: 'move',
      dice: [
        { number: null },
        { number: null }
      ],
      off_board: {
        pieces: []
      }
      points: [
        { number: 1, pieces: [ { owner: 1 }, { owner: 1 } ] },
        { number: 2, pieces: [ ] },
        ...
      ]
    },
    players: [
      { player_number: 1, name: 'aaa' },
      { player_number: 2, name: 'bbb' }
    ],
    winner: null
  });
```

Initialize a Move object

```javascript
  // from: Point
  // to: Point
  // moveList: Array with keys: from, to
  // user: User
  // gameState: gameState
  let move = new Move({
    from: from, 
    to: to, 
    moveList: moveList, 
    user: user, 
    gameState: gameState
  });
```

Check if Move Possible

```javascript
  // returns true if that piece can move.
  move.possible(); 
```

Check if Move Valid

```javascript
  // returns true if that piece can move to that point.
  move.valid(); 
```

Check if Move Complete

```javascript
  // returns true if there are no other pieces that can still move.
  move.complete(); 
```

## Development

After checkout out the repo, run `npm install` to install dependencies. Run `npm build` to transpile ES6 to ES5 into the lib directory. Run `npm test` to run the tests.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/mrlhumphreys/jbackgammon. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The module is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
