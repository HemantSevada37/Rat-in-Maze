import React from "react";

const Game = () => {
  let arr = JSON.parse(
    JSON.stringify(new Array(Number(5)).fill(new Array(Number(5)).fill([])))
  );
  // console.log(arr);

  const fun = (arr, i, j) => {
    console.log(i, j);

    const tempArr = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    tempArr.sort((a, b) => 0.5 - Math.random());
    // console.log(tempArr);

    let nextI, nextJ;
    for (let element of tempArr) {
      nextI = i + element[0];
      nextJ = j + element[1];

      if (
        nextI < 0 ||
        nextJ < 0 ||
        nextI >= arr.length ||
        nextJ >= arr[0].length
      )
        continue;

      if (arr[nextI][nextJ].length) continue;

      arr[i][j].push(element);
      arr[nextI][nextJ].push(element.map((e) => e * -1));

      fun(arr, nextI, nextJ);
    }
  };

  fun(arr, 0, 0);

  return <div>Game</div>;
};

export default Game;
