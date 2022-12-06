import React from 'react'
import './Game.css';
import Maze from './Maze';

const Game = () => {
    let arr = JSON.parse(JSON.stringify(new Array(13).fill(new Array(13).fill(3))));

    const sp = {
        ratRow: 0,
    ratColumn: 0,
    cheeseRow: arr.length-1,
    cheeseColumn: arr[0].length-1
    }

    let findPaths = (arr, x, y, g, h, emptyArr)=>{
        if(x === g && y === h){
            return true;
        }
        if(x < 0 || x >= arr.length) return;
        if(y < 0 || y >= arr[x].length) return;
        if(emptyArr[x][y] !== 0) return;
    
        emptyArr[x][y] = 2;
    
        return findPaths(arr, x+1, y, g, h, JSON.parse(JSON.stringify(emptyArr))) ||
        findPaths(arr, x, y+1, g, h, JSON.parse(JSON.stringify(emptyArr))) ||
        findPaths(arr, x-1, y, g, h, JSON.parse(JSON.stringify(emptyArr))) ||
        findPaths(arr, x, y-1, g, h, JSON.parse(JSON.stringify(emptyArr))) || false; // yeh sikha
    }
    

    // const fun=()=>{
    //         const size = (arr.length * arr[0].length)-2;
    //         for(let i=0; i<size*0.45; i++){
    //             let temp = Math.trunc((Math.random()*size)+1);
    //             arr[Math.trunc(temp/arr.length)][temp%arr.length] = 1;
    //         }
    // }
    const fun =(arr, x, y)=>{
        if(x < 0 || x >= arr.length) return;
        if(y < 0 || y >= arr[x].length) return;

        arr[x][y] = arr[x][y] -1;
        if(arr[x][y] <= 1) return;

        arr[x][y] = 0;

        let temp = [[x+1, y], [x-1, y], [x, y+1], [x, y-1]];
        temp.sort(0.5-Math.random());
        for(let i of temp){
            fun(arr, i[0], i[1]);
        }

    }
    fun(arr, 0, 0);
    // console.log(findPaths(arr, sp.ratRow, sp.ratColumn, sp.cheeseRow, sp.cheeseColumn, JSON.parse(JSON.stringify(arr))));

  return (
    <div className='game-container'>
      {/* <Maze maze={arr} startPoint={sp}/> */}
    </div>
  )
}

export default Game
