import { exists } from './utils'

class Die {
  constructor(args) {
    this.id = args.id;
    this.number = args.number;
    this.used = exists(args.used) ? args.used : false;
  }

  get asJson() {
    return {
      id: this.id,
      number: this.number,
      used: this.used
    };
  }

  // setters

  use() {
    this.used = true;
  }
};

export default Die
