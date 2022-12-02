
import { useEffect, useState } from 'react';
import './App.css';
import Maze from './Maze';

function App() {
  const [maze, setMaze] = useState([[0, 0, 0, 0], [1, 1, 0, 0],[1, 1, 1, 0],[0, 0, 0, 0]])
  // console.log("maze is ", maze);
  const [paths, setPaths] = useState([]);
  // console.log(paths);
  const [inputs, setInputs] = useState({
    row: 4,
    column: 4
  })
  // console.log("input state is ", inputs)

  const inputOne =(e)=>{
    // console.log(e.target.value);
    setInputs({...inputs, row: e.target.value});

  }
  const inputTwo =(e)=>{
    // console.log(e.target.value);
    setInputs({...inputs, column: e.target.value});

  }
   useEffect(()=>{
    // console.log("useEffect is running")
    // console.log("input state is:", inputs)
    let a = new Array((Number)(inputs.row)).fill(new Array((Number)(inputs.column)).fill(0)); // yeh sikha, number dena
    // console.log("y isssssssssssss : ", a);
    setMaze(JSON.parse(JSON.stringify(a)));
  },[inputs])


  const countPaths=(arr)=>{
    let count=0;
    for(let i of arr){
      for(let j of i){
        if(j === 2) count++;
      }
    }
    return count;
  }



  let ans = [];

  let findPaths = (arr, x, y, emptyArr)=>{
    if(x == arr.length-1 && y == arr[x].length-1){
        emptyArr[x][y] = 2;
        ans.push(emptyArr);
        // setPaths([...paths, emptyArr]);
      //   console.log("pushing");
        return;
    }
    if(x < 0 || x >= arr.length) return;
    if(y < 0 || y >= arr[x].length) return;
    if(emptyArr[x][y]) return;

    emptyArr[x][y] = 2;
  //   console.log(x, y,   emptyArr);

    findPaths(arr, x+1, y, JSON.parse(JSON.stringify(emptyArr)));
    findPaths(arr, x-1, y, JSON.parse(JSON.stringify(emptyArr)));
    findPaths(arr, x, y+1, JSON.parse(JSON.stringify(emptyArr)));
    findPaths(arr, x, y-1, JSON.parse(JSON.stringify(emptyArr))); // yeh sikha
}

const handleClick =()=>{
  findPaths(maze, 0, 0, JSON.parse(JSON.stringify(maze)));
  setPaths(ans);
}

  return (
    <div className="App">
      <div className='header'>
        <h1>Rat in a Maze</h1>

        <form>
        <label>Rows </label>
        <input type='number' value={inputs.row} min="2" onChange={(e)=>{inputOne(e)}} />
        <br/>
        <label>Columns </label>
        <input type='number' value={inputs.column} min="2" onChange={(e)=>{inputTwo(e)}} />
        </form><br/>
        
        <Maze maze={maze} setMaze={setMaze} />
        <button onClick={handleClick}>Find Paths</button>
        
      </div>
    
      <hr/>
      <div className='header'>
      <h2>Shortest Path</h2>
        {paths.length && 
      <Maze maze={paths.reduce((x, y)=>{
        if(countPaths(x) <= countPaths(y)){
          return x;
        }else{
          return y;
        }
      })} type={false}/>}
      </div>

      <hr/>
      <h3>Total Paths : {paths.length}</h3>
      <div className='paths'>
          {paths.map((e, i)=>{
            return <div key={i}>
              <h3>Path: {i+1}</h3>
              <Maze maze={e} />
            </div>
          })}
      </div>
      
    </div>
  );
}

export default App;
