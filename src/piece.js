class Piece {
  constructor(args) {
    this.owner = args.owner
  }

  asJson() {
    return {
      owner: this.owner
    };
  }
};

export default Piece
