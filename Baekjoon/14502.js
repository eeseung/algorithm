// 연구소
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function combination(arr, selectNum) {
  const result = [];

  if (selectNum === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, i, arr) => {
    const rest = arr.slice(i + 1);
    const c = combination(rest, selectNum - 1);
    const r = c.map((v) => [fixed, ...v]);

    result.push(...r);
  });

  return result;
}

function spreadVirus(x, y, arr) {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (0 <= nx && nx < N && 0 <= ny && ny < M && arr[nx][ny] === 0) {
      arr[nx][ny] = 2;
      spreadVirus(nx, ny, arr);
    }
  }
}

function solution(N, M, arr) {
  const wallPositions = [];
  let answer = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 0) wallPositions.push(`${i}${j}`);
    }
  }

  const wallCombinations = combination(wallPositions, 3);

  for (const walls of wallCombinations) {
    const grid = arr.map((v) => [...v]);

    for (const wall of walls) {
      const [x, y] = wall.split("").map(Number);
      grid[x][y] = 1;
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (grid[i][j] === 2) spreadVirus(i, j, grid);
      }
    }

    const safeArea = grid.reduce(
      (acc, cur) => acc + cur.filter((v) => v === 0).length,
      0
    );
    answer = Math.max(answer, safeArea);
  }

  return answer;
}

console.log(solution(N, M, arr));
