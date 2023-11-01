class Chip {
  u: Chip | null = null;
  d: Chip | null = null;
  l: Chip | null = null;
  r: Chip | null = null;
  ur: Chip | null = null;
  ul: Chip | null = null;
  dl: Chip | null = null;
  dr: Chip | null = null;
  constructor(
    public row: number,
    public col: number,
    public rows: number,
    public cols: number,
    public board: Chip[][],
    public player: string | null = null
  ) {}
  setPlayer(player: string) {
    this.player = player;
  }

  private setInnerNeighbors() {
    this.u = this.board[this.row - 1][this.col];
    this.d = this.board[this.row + 1][this.col];
    this.l = this.board[this.row][this.col - 1];
    this.r = this.board[this.row][this.col + 1];
    this.ur = this.board[this.row - 1][this.col + 1];
    this.ul = this.board[this.row - 1][this.col - 1];
    this.dl = this.board[this.row + 1][this.col - 1];
    this.dr = this.board[this.row - 1][this.col + 1];
  }

  // Because we're 0 indexing the up and down rows are flipped.  This is so that my brain can manage which cell is where considering a 2d board
  setNeighbors() {
    // set if inner neighbor
    if (this.row > 0 && this.row < this.rows - 1) {
      if (this.col > 0 && this.col < this.cols - 1) {
        this.setInnerNeighbors();
      }
      // set the edges that aren't corners
    } else if (
      // set rows 0 and 5
      (this.col !== 0 && this.col !== this.cols - 1 && this.row === 0) ||
      this.row === this.rows - 1
    ) {
      this.r = this.board[this.row][this.col + 1];
      this.l = this.board[this.row][this.col - 1];
      if (this.row === 0) {
        this.dr = this.board[this.row + 1][(this.col = 1)];
        this.d = this.board[this.row + 1][this.col];
        this.dr = this.board[this.row + 1][this.col + 1];
      } else if (this.row === this.rows - 1) {
        this.ul = this.board[this.rows - 1][this.cols - 1];
        this.u = this.board[this.rows - 1][this.cols];
        this.ur = this.board[this.rows - 1][this.cols + 1];
      }
    } else if (
      // set cols 0 and 6
      this.row !== 0 &&
      this.row !== this.rows - 1 &&
      (this.col === 0 || this.col === this.cols - 1)
    ) {
      this.u = this.board[this.rows - 1][this.col];
      this.d = this.board[this.rows + 1][this.col];
      if (this.col === 0) {
        this.ur = this.board[this.row - 1][this.col + 1];
        this.r = this.board[this.row][this.col + 1];
        this.dr = this.board[this.row - 1][this.col + 1];
      } else if (this.col === this.cols - 1) {
        this.l = this.board[this.row][this.col - 1];
        this.ul = this.board[this.row - 1][this.col - 1];
        this.dl = this.board[this.row + 1][this.col - 1];
      }
      // set corners
    } else if (this.row === 0) {
      this.d = this.board[this.row + 1][this.col];
      if (this.col === 0) {
        this.r = this.board[this.row][this.col + 1];
        this.dr = this.board[this.row - 1][this.col + 1];
      } else if (this.col === this.cols - 1) {
        this.l = this.board[this.row][this.col - 1];
        this.dl = this.board[this.row + 1][this.col - 1];
        this.d = this.board[this.rows + 1][this.col];
      }
    } else if (this.row === this.rows - 1) {
      this.u = this.board[this.rows - 1][this.col];
      if (this.col === 0) {
        this.ur = this.board[this.row - 1][this.col + 1];
        this.r = this.board[this.row][this.col + 1];
      } else if (this.col === this.cols - 1) {
        this.ul = this.board[this.row - 1][this.col - 1];
        this.l = this.board[this.row][this.col - 1];
      }
    }
  }
}

class ConnectFour {
  ROWS = 6;
  COLS = 7;
  board: Chip[][];
  constructor(rows: number, cols: number) {
    this.board = new Array(rows);
    for (let row = 0; row < rows - 1; row++) {
      this.board[0] = new Array(cols);
      for (let col = 0; col < cols - 1; col++) {
        this.board[row].push(new Chip(row, col, rows, cols, this.board, null));
      }
    }
    for (const row of this.board) {
      for (const chip of row) {
        chip.setNeighbors();
      }
    }
  }
}
