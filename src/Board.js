import React from 'react';

import './index.css';

import './Square';

// eslint-disable-next-line no-unused-vars
class Board extends React.Component {
  
    renderSquare(i) {
      let Square;
      return (
        <Square
          // eslint-disable-next-line react/destructuring-assignment
          value={this.props.squares[i]} 
          // eslint-disable-next-line react/destructuring-assignment
          onClick={() => this.props.onClick(i)}
        />
      );  
    }

    render() {
    let SquareRow;
      let board;
      // eslint-disable-next-line prefer-const
      board = this.squares.map((row, idx) => {
        const k = `r${  idx}`;
        return (
          // eslint-disable-next-line react/destructuring-assignment
          <SquareRow winner={this.props.winner} rowIdx={idx} row={row} onClick={this.props.onClick} key={k}/>
        )
      })
      return (
        <div>
          {board}
        </div>
      );
    }
  }