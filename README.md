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
        { number: 1, pieces: [ { player_number: 1 }, { player_number: 1 } ] },
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

Serialize match

```javascript
  match.asJson;
```

See if player can pass

```javascript
  playerNumber = 1;
  match.passable(playerNumber); 
```

Roll Dice

```javascript
  playerNumber = 1;
  match.touchDice(playerNumber);
```

Make a move

```javascript
  match.touchPoint(4, 1); // select point 4 for player 1
  match.touchPoint(6, 1); // select point 6 for player 1
```

Pass turn

```javascript
  playerNumber = 1;
  match.touchPass(playerNumber);
```

Get winner

```javascript
  match.winner;
```

## Development

After checkout out the repo, run `npm install` to install dependencies. Run `npm build` to transpile ES6 to ES5 into the lib directory. Run `npm test` to run the tests.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/mrlhumphreys/jbackgammon. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The module is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
