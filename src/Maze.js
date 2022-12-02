import React from 'react'
import './Maze.css'
import rat from './photos/rat.png'
import cheese from './photos/cheese.png'

const Maze = ({maze, setMaze}) => {
    // console.log(maze, setMaze, type)
    const fun =(i, j)=>{
        // console.log(i, j);
        let temp = maze;
        temp[i][j] = (temp[i][j] ? 0 : 1)
            // console.log(temp);
        setMaze([...temp]) // yeh sikha
    }

  return (
    <div style={{gridTemplateColumns: `repeat(${maze[0].length}, 1fr)`}} className='container'>
      {maze.map((a, i)=>{
        return a.map((e, j)=> {
            if(i===0 && j===0){
                return <div className='block greenBlock' key={i+" "+j}><img src={rat} alt='Rat pic'/></div>
            }else if(i=== maze.length-1 && j === a.length-1){
                return <div className='block greenBlock' key={i+" "+j}><img src={cheese} alt='Cheese pic'/></div>
            }

            if(setMaze){
                if(e === 0){
                    return <div className='block emptyBlock' onClick={()=>{fun(i, j)}} key={i+" "+j}></div>
                }else if(e === 1){
                    return <div className='block redBlock' onClick={()=>{fun(i, j)}} key={i+" "+j}></div>
                }
            }else{
                if(e === 0){
                    return <div className='block emptyBlock' key={i+" "+j} ></div>
                }else if(e === 1){
                    return <div className='block redBlock' key={i+" "+j} ></div>
                }else if(e === 2){
                    return <div className='block greenBlock' key={i+" "+j} ></div>
                }
            }
        })
      })}
    </div>
  )
}

export default Maze