// 스도쿠
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const arr = input.map((v) => v.split(" ").map(Number));

function solution(arr) {
  const positions = [];
  let answer = [];

  // 빈 칸 위치 찾기
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (arr[i][j] === 0) positions.push([i, j]);
    }
  }

  // 스도쿠 규칙을 만족하는지 확인
  function isSudoku(row, column, num) {
    const boxRow = Math.floor(row / 3) * 3; // 3*3 정사각형 시작 행
    const boxColumn = Math.floor(column / 3) * 3; // 3*3 정사각형 시작 열

    for (let i = 0; i < 9; i++) {
      if (arr[row][i] === num) return false;
      else if (arr[i][column] === num) return false;
    }

    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxColumn; j < boxColumn + 3; j++) {
        if (arr[i][j] === num) return false;
      }
    }

    return true;
  }

  function dfs(idx) {
    if (idx === positions.length) {
      answer = arr.map((v) => [...v]);
      return;
    }

    const [r, c] = positions[idx];

    for (let i = 1; i <= 9; i++) {
      if (isSudoku(r, c, i)) {
        arr[r][c] = i;
        dfs(idx + 1);
        arr[r][c] = 0;
      }
    }
  }

  dfs(0);

  return answer.map((v) => v.join(" ")).join("\n");
}

console.log(solution(arr));
