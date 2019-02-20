class Die {
  constructor(args) {
    this.number = args.number;
    this.used = args.used ? true : false;
  }

  use() {
    this.used = true;
  }
};

export default Die
