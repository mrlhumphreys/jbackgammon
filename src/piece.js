class Piece {
  constructor(args) {
    this.id = args.id
    this.owner = args.owner
  }

  get asJson() {
    return {
      id: this.id,
      owner: this.owner
    };
  }
};

export default Piece
