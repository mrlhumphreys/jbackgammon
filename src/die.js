import exists from './exists'

class Die {
  constructor(args) {
    this.number = args.number;
    this.used = exists(args.used) ? args.used : false;
  }

  get asJson() {
    return {
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
