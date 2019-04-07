class Piece {
  constructor(args) {
    this.owner = args.owner
  }

  get asJson() {
    return {
      owner: this.owner
    };
  }
};

export default Piece
