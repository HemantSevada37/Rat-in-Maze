
import { useEffect, useState } from 'react';
import './Home.css';
import Maze from './Maze';

function Home() {
  // console.log("Home is running");
  const [maze, setMaze] = useState([[0, 0, 0, 0], [1, 1, 0, 0],[1, 1, 1, 0],[0, 0, 0, 0]])
  const [paths, setPaths] = useState([]);

  const [inputs, setInputs] = useState({
    row: 4,
    column: 4
  })
  const [startPoint, setStartPoint] = useState({
    ratRow: 0,
    ratColumn: 0,
    cheeseRow: inputs.row-1,
    cheeseColumn: inputs.column-1
  })

  const [show, setShow] = useState(false);

  let ans = [];



  // const inputOne =(e)=>{
  //   setInputs({...inputs, row: (Number)(e.target.value)});

  // }
  // const inputTwo =(e)=>{
  //   setInputs({...inputs, column: (Number)(e.target.value)});
  // }

   useEffect(()=>{
    let a = new Array((Number)(inputs.row)).fill(new Array((Number)(inputs.column)).fill(0)); // yeh sikha, number dena
    setMaze(JSON.parse(JSON.stringify(a)));
    setStartPoint({...startPoint, cheeseRow: inputs.row-1, cheeseColumn: inputs.column-1});
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



   let findPaths = (arr, x, y, g, h, emptyArr)=>{
    if(x === g && y === h){
        emptyArr[x][y] = 2;
        ans.push(emptyArr);
        return;
    }
    if(x < 0 || x >= arr.length) return;
    if(y < 0 || y >= arr[x].length) return;
    if(emptyArr[x][y] !== 0) return;

    emptyArr[x][y] = 2;

    findPaths(arr, x+1, y, g, h, JSON.parse(JSON.stringify(emptyArr)));
    findPaths(arr, x, y+1, g, h, JSON.parse(JSON.stringify(emptyArr)));
    findPaths(arr, x-1, y, g, h, JSON.parse(JSON.stringify(emptyArr)));
    findPaths(arr, x, y-1, g, h, JSON.parse(JSON.stringify(emptyArr))); // yeh sikha
}



  const handleClick =()=>{
    findPaths(maze, startPoint.ratRow, startPoint.ratColumn, startPoint.cheeseRow, startPoint.cheeseColumn, JSON.parse(JSON.stringify(maze)));
    setPaths(ans);
  }


  // const startRow =(event)=>{
  //   setStartPoint({...startPoint, ratRow: event.target.value-1});
  // }
  // const startColumn =(event)=>{
  //   setStartPoint({...startPoint, ratColumn: event.target.value-1});
  // }
  // const endRow =(event)=>{
  //   setStartPoint({...startPoint, cheeseRow: event.target.value-1});
  // }
  // const endColumn =(event)=>{
  //   setStartPoint({...startPoint, cheeseColumn: event.target.value-1});
  // }


  return (
    <div className="App">
      <div className='header'>
        <h1>Rat in a Maze</h1>
        <div>
            <button onClick={()=>{setShow(!show)}}>Settings</button>
            <button onClick={handleClick}>Find Paths</button>
            <hr/>
        </div>
        
        {show && 
          <div className='forms'>
            <form>
            <h2>Maze's size</h2>
            <label>Rows </label>
            <input type='number' value={inputs.row} min="2" 
                onChange={(e)=>{setInputs({...inputs, row: (Number)(e.target.value)})}} />
            <br/>
            <label>Columns </label>
            <input type='number' value={inputs.column} min="2" 
                onChange={(e)=>{setInputs({...inputs, column: (Number)(e.target.value)})}} />
            </form>

            <form>
              <h2>Rat's position</h2>
              <label>Row : </label>
              <input type="number" value={startPoint.ratRow+1} min='1' max={inputs.row}
                  onChange={(e)=>{setStartPoint({...startPoint, ratRow: e.target.value-1})}} />
              <br/>
              <label>Column : </label>
              <input type="number" value={startPoint.ratColumn+1} min='1' max={inputs.column} 
                  onChange={(e)=>{setStartPoint({...startPoint, ratColumn: e.target.value-1})}} />
            </form>
            
            <form>
              <h2>Cheese's position</h2>
              <label>Row : </label>
              <input type="number" value={startPoint.cheeseRow+1} min='1' max={inputs.row} 
                  onChange={(e)=>{setStartPoint({...startPoint, cheeseRow: e.target.value-1})}} />
              <br/>
              <label>Column : </label>
              <input type="number" value={startPoint.cheeseColumn+1} min='1' max={inputs.column} 
                  onChange={(e)=>{setStartPoint({...startPoint, cheeseColumn: e.target.value-1})}} />
            </form>
            <br/>
            <br/>
          </div>
        }

        <Maze maze={maze} setMaze={setMaze} startPoint={startPoint}/>
      </div>
    
      <hr/>
      <div className='header'>
        <h2>Shortest Path</h2>
          {paths.length && <Maze maze={paths.reduce((x, y)=>{
              if(countPaths(x) <= countPaths(y)){
                return x;
              }else{
                return y;
              }
          })} startPoint={startPoint}/>}
      </div>

      <hr/>
      <h3>Total Paths : {paths.length}</h3>
      <div className='paths'>
          {paths.map((e, i)=>{
            return <div key={i}>
              <h3>Path: {i+1}</h3>
              <Maze maze={e}  startPoint={startPoint} />
            </div>
          })}
      </div>
      
    </div>
  );
}

export default Home;






// ........................................................................................
// import { useEffect, useState } from 'react';
// import './App.css';
// import Maze from './Maze';

// function Home() {
//   const [maze, setMaze] = useState([[0, 0, 0, 0], [1, 1, 0, 0],[1, 1, 1, 0],[0, 0, 0, 0]])
//   // console.log("maze is ", maze);
//   const [paths, setPaths] = useState([]);
//   // console.log(paths);
//   const [inputs, setInputs] = useState({
//     row: 4,
//     column: 4
//   })
//   // console.log("input state is ", inputs)

//   const inputOne =(e)=>{
//     // console.log(e.target.value);
//     setInputs({...inputs, row: e.target.value});

//   }
//   const inputTwo =(e)=>{
//     // console.log(e.target.value);
//     setInputs({...inputs, column: e.target.value});

//   }
//    useEffect(()=>{
//     // console.log("useEffect is running")
//     // console.log("input state is:", inputs)
//     let a = new Array((Number)(inputs.row)).fill(new Array((Number)(inputs.column)).fill(0)); // yeh sikha, number dena
//     // console.log("y isssssssssssss : ", a);
//     setMaze(JSON.parse(JSON.stringify(a)));
//   },[inputs])


//   const countPaths=(arr)=>{
//     let count=0;
//     for(let i of arr){
//       for(let j of i){
//         if(j === 2) count++;
//       }
//     }
//     return count;
//   }



//   let ans = [];

//   let findPaths = (arr, x, y, emptyArr)=>{
//     if(x == arr.length-1 && y == arr[x].length-1){
//         emptyArr[x][y] = 2;
//         ans.push(emptyArr);
//         // setPaths([...paths, emptyArr]);
//       //   console.log("pushing");
//         return;
//     }
//     if(x < 0 || x >= arr.length) return;
//     if(y < 0 || y >= arr[x].length) return;
//     if(emptyArr[x][y]) return;

//     emptyArr[x][y] = 2;
//   //   console.log(x, y,   emptyArr);

//     findPaths(arr, x+1, y, JSON.parse(JSON.stringify(emptyArr)));
//     findPaths(arr, x-1, y, JSON.parse(JSON.stringify(emptyArr)));
//     findPaths(arr, x, y+1, JSON.parse(JSON.stringify(emptyArr)));
//     findPaths(arr, x, y-1, JSON.parse(JSON.stringify(emptyArr))); // yeh sikha
// }

// const handleClick =()=>{
//   findPaths(maze, 0, 0, JSON.parse(JSON.stringify(maze)));
//   setPaths(ans);
// }

//   return (
//     <div className="App">
//       <div className='header'>
//         <h1>Rat in a Maze</h1>

//         <form>
//         <label>Rows </label>
//         <input type='number' value={inputs.row} min="2" onChange={(e)=>{inputOne(e)}} />
//         <br/>
//         <label>Columns </label>
//         <input type='number' value={inputs.column} min="2" onChange={(e)=>{inputTwo(e)}} />
//         </form><br/>
        
//         <Maze maze={maze} setMaze={setMaze} />
//         <button onClick={handleClick}>Find Paths</button>
        
//       </div>
    
//       <hr/>
//       <div className='header'>
//       <h2>Shortest Path</h2>
//         {paths.length && 
//       <Maze maze={paths.reduce((x, y)=>{
//         if(countPaths(x) <= countPaths(y)){
//           return x;
//         }else{
//           return y;
//         }
//       })} type={false}/>}
//       </div>

//       <hr/>
//       <h3>Total Paths : {paths.length}</h3>
//       <div className='paths'>
//           {paths.map((e, i)=>{
//             return <div key={i}>
//               <h3>Path: {i+1}</h3>
//               <Maze maze={e} />
//             </div>
//           })}
//       </div>
      
//     </div>
//   );
// }

// export default Home;
