import React from 'react';
import ReactDOM from 'react-dom';

import '../index.css';
import Board from './board.js';
import initialiseGameBoard from '../helper/initial.js';

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          squares: initialiseGameBoard(),
          sourceSelection: -1,
            moves: 1,
          status: ''
        }
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        
        if(this.state.sourceSelection === -1){
            this.setState({
                status: "Choose destination for the selected piece",
                sourceSelection: i
            },() => console.log(this.state.sourceSelection));
        }
        else if(this.state.sourceSelection > -1){
        if(squares[i] != null) {
            squares[i] = null;
            squares[this.state.sourceSelection] = null;
        }
          if(squares[i]){
            this.setState({
                status: "Wrong selection. Choose valid source and destination again.",
                sourceSelection: -1,
            },() => console.log(this.state.sourceSelection));
          }
          else{
            this.setState({
                moves: this.state.moves + 1
            },() => console.log(this.state.sourceSelection));
            
            const squares = this.state.squares.slice();
            const l = this.state.squares.length;
            const isDestEnemyOccupied = squares[i]? true : false; 
            const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied, this.state.squares[l-1], this.state.squares[l-2]);
            const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
            const isMoveLegal = this.isMoveLegal(srcToDestPath);
    
            if(isMovePossible && isMoveLegal){
              squares[i] = squares[this.state.sourceSelection];
              squares[this.state.sourceSelection] = null;
              this.setState({
                sourceSelection: -1,
                squares: squares,
                status: '',
                },() => console.log(this.state.sourceSelection));
            }
            else{
              this.setState({
                status: "Wrong selection. Choose valid source and destination again.",
                sourceSelection: -1,
              });
            }
          }
          var flag=0;
          for(let k=1; k<squares.length-2; k++) {
            if(squares[k]!=null)
            flag=1
          }
          if(flag===0)
          alert("total moves "+ this.state.moves);
        }
    
      }

    isMoveLegal(srcToDestPath){
        let isLegal = true;
        for(let i = 0; i < srcToDestPath.length; i++){
            if(this.state.squares[srcToDestPath[i]] !== null){
            isLegal = false;
            }
        }
        return isLegal;
    }

    render() {
        return (
            <div className="game-board">
                <Board
                    squares = {this.state.squares}
                    onClick = {(i) => this.handleClick(i)}
                    />
            </div>
        );
    }
}