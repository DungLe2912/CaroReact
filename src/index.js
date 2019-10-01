import React from 'react';

import ReactDOM from 'react-dom';

import './index.css';

import './Board';

import'./Square';

const defaultWidth = 20;
const defaultHeight = 20;
const nSquareToWin = 5;


function calculateWinner(squares) {
  let win;
  for (let i = 0; i < squares.length; i+=1) {
    for (let j = 0; j < squares[i].length; j+=1) {
      // Kiểm trang NSquareToWin ô liên tiếp từ ô xuất phát sang phải, xuống góc phải dưới, xuống góc trái dưới
      // Nếu có NSquareToWin - 1 cặp liên tiếp giống nhau thì thắng
      // Direction: ToRight, ToRightDown, ToDown, ToLeftDown
      // eslint-disable-next-line no-continue
      if (!squares[i][j]) continue;
      if (j <= squares[i].length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k+=1) {
          if (squares[i][j + k] !== squares[i][j + k + 1]) {
            win = false
          }
        }
        if (win) return {val: squares[i][j], x: j, y: i, direction: 'ToRight'};
      }
      if (i <= squares.length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k+=1) {
          if (squares[i + k][j] !== squares[i + k + 1][j]) {
            win = false
          }
        }
        if (win) return {val: squares[i][j], x: j, y: i, direction: 'ToDown'};
      }
      if (j <= squares[i].length - nSquareToWin && i <= squares.length - nSquareToWin) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k+=1) {
          if (squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]) {
            win = false
          }
        }
        if (win) return {val: squares[i][j], x: j, y: i, direction: 'ToRightDown'};
      }
      if (i <= squares.length - nSquareToWin && j >= nSquareToWin - 1) {
        win = true;
        for (let k = 0; k < nSquareToWin - 1; k+=1) {
          if (squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]) {
            win = false
          }
        }
        if (win) return {val: squares[i][j], x: j, y: i, direction: 'ToLeftDown'};
      }
    }
  }
  return null;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    const  tmpArr = Array(defaultHeight);
    for (let i = 0; i < defaultHeight; i+=1) {
      tmpArr[i] = Array(defaultWidth).fill(null);
    }
    this.state = {
      history: [{
        squares: tmpArr,
        location: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      // eslint-disable-next-line react/no-unused-state
      isDescending: true,
    };
    
    this.sort = this.sort.bind(this);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }
  
  handleClick(i, j) {
    this.setState((stateGame)=>{
      const history = stateGame.history.slice(0, stateGame.stepNumber + 1);
    const current = history[stateGame.stepNumber];
    const squares = current.squares.slice();
    current.squares.map((row, idx) => {
      squares[idx] = current.squares[idx].slice();
      return true;
    })
    if (calculateWinner(squares) || squares[i][j]) {
      return;
    }
    squares[i][j] = stateGame.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        // eslint-disable-next-line object-shorthand
        squares:squares,
        location: {x: i, y: j}
      }]),
      stepNumber: history.length,
      xIsNext: !stateGame.xIsNext,
    });
    })
  }

  sort() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({isDescending: !this.Descending});
  }
 
  render() {
    const {history} = this.state;
    const current = history[this.stepNumber];
    const winner = calculateWinner(current.squares);
    let Board;
    let moves = history.map((step) => {
      const desc = step.move ?
        `Go to move #${  step.move  } (${  step.location.x  },${  step.location.y  })` :
        'Go to game start';
      return (this.stepNumber === step.move) ? (
        <li key={step.move}>
          <button type="button" className="btn-bold" onClick={() => this.jumpTo(step.move)}>{desc}</button>
        </li>
      ) : (
        <li key={step.move}>
        <button type="button" onClick={() => this.jumpTo(step.move)}>{desc}</button>
      </li>
      );
    });
    if (!this.isDescending) {
      moves = moves.reverse();
    }

    let status;
    if (winner) {
      status = `Winner: ${  winner.val}`;
    } else {
      status = `Next player: ${  this.xIsNext ? 'X' : 'O'}`;
    }

    const arrow = this.isDescending ? '↓' : '↑'
    
    return (
      
      <div className="content">
       
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i, j) => this.handleClick(i, j)}
              winner={winner}
            />
          </div>
          <div className="game-info">
            <div>
              <button type="button" onClick={this.sort}>Thứ tự bước {arrow}</button>
            </div>
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

