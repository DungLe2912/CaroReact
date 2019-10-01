/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

import './index.css';

const nSquareToWin = 5;

function Square(props) {
    // eslint-disable-next-line react/destructuring-assignment
    return (props.win) ? (
      // eslint-disable-next-line react/destructuring-assignment
       // eslint-disable-next-line react/destructuring-assignment
      <button type="button" className="square square-highlight" onClick={props.onClick}>
       
        {props.value}
      </button>
    ) : (
      <button type="button" className="square" onClick={props.onClick}>
        {props.value}
      </button>  
    )  ;
  }
  
  // eslint-disable-next-line react/prefer-stateless-function
  class SquareRow extends React.Component {
    render() {
      const squareRow = this.props.row.map((square, idx) => {
        const k = `s${  idx}`;
        let win = false;
        const {winner} = this.props;
        const {rowIdx} = this.props;
        if (winner) {
          if (winner.direction === "ToRight" &&
            idx >= winner.x && idx <= winner.x + nSquareToWin - 1 && rowIdx === winner.y) {
              win = true;
          }
          if (winner.direction === "ToDown" &&
              rowIdx >= winner.y && rowIdx <= winner.y + nSquareToWin - 1 && idx === winner.x) {
              win = true;
          }
          if (winner.direction === "ToRightDown" &&
            idx >= winner.x && idx <= winner.x + nSquareToWin - 1 && idx - winner.x === rowIdx - winner.y) {
              win = true;
          }
          if (winner.direction === "ToLeftDown" &&
            idx <= winner.x && idx >= winner.x - nSquareToWin + 1 && winner.x - idx === rowIdx - winner.y) {
              // eslint-disable-next-line no-console
              console.log(`${winner.x} ${winner.y} ${idx} ${rowIdx} ${nSquareToWin}`);
              win = true;
          }
        }
        return (
          <Square win={win} value={square} onClick={() => this.props.onClick(this.props.rowIdx, idx)} key={k} />
        )
      })
      return (
        <div className="board-row">
          {squareRow}
        </div>
      )
    }
  }
  