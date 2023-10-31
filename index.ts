class ConnectFour {
  private board: string[][];
  private turn: "red" | "yellow" = "red";
  constructor() {
    this.board = new Array(7);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(6).fill("");
    }
    return this;
  }

  takeTurn(column: number): boolean {
    /**
     * Return an object that has {
     * valid: boolean;
     * winningMove?: boolean;
     * errorMessage?: string;
     * }
     * Red starts and uses a turn
     * A turn consists of placing a chip in the board
     * which means choosing a column to place the chip in
     * chip falls down to the lowest possible level
     * we do some check board state function to determine if there is a winner
     */
    // return checkBoardState
    // if (column < 0 || column  > 7) {
    // }
    let i = this.board[column].length - 1;
    while (this.board[column][i] !== "" && i > 0) {
      i--;
    }
    this.board[column][i] = this.turn;
    console.log(this.board);
    // this.turn = this.turn === "red" ? "yellow" : "red";
    return this.checkBoardState(column, i);
  }

  checkBoardState(column: number, row: number): boolean {
    let longestChain = 1;
    for (let i = row + 1; i <= this.board[column].length - 1; i++) {
      if (this.board[column][i] === this.turn) {
        longestChain++;
      } else {
        break;
      }
    }
    for (let i = row - 1; i >= 0; i--) {
      if (this.board[column][i] === this.turn) {
        longestChain++;
      } else {
        break;
      }
    }

    if (longestChain >= 4) {
      return true;
    } else {
      longestChain = 1;
    }

    // check rows
    for (let i = column + 1; i <= this.board.length - 1; i++) {
      if (this.board[i][row] === this.turn) {
        longestChain++;
      } else {
        break;
      }
    }

    for (let i = column - 1; i >= 0; i--) {
      if (this.board[i][row] === this.turn) {
        longestChain++;
      } else {
        break;
      }
    }

    // console.log({ longestChain });
    if (longestChain >= 4) {
      return true;
    } else {
      longestChain = 1;
    }

    // upwards
    for (let i = column + 1, j = row - 1; j >= 0 && i <= this.board.length; i++, j--) {
      if ()
    }
    /**
     * At 1,1
     * Check 0,0
     * Check 0,2
     * Check 2,0
     * Check 2,2
     * column <= array[i]
     * row <= array.length
     * ["","","","","",""] 
     * ["","","","","",""]
     * ["","","","","",""]
     * ["","","","","",""]
     * ["","","","","",""]
     * ["","","","","",""]
     * ["","","","","",""]
     * 
     */
    return false;
  }

  reset() {
    for (const column of this.board) {
      for (let row of column) {
        row = "";
      }
    }
  }
}

const main = () => {
  const connectFour = new ConnectFour();
  // for (let i = 0; i < 4; i++) {
  connectFour.takeTurn(0);
  connectFour.takeTurn(1);
  connectFour.takeTurn(2);
  connectFour.takeTurn(3);

  // }
  // connectFour.takeTurn(6);
};

main();
