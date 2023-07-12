// 미세먼지 안녕!
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [R, C, T] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(R, C, T, arr) {
  let grid = Array.from({ length: R + 1 }, () => Array(C + 1).fill(0));
  const cleaner = []; // 공기청정기 위치

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  for (let r = 1; r <= R; r++) {
    for (let c = 1; c <= C; c++) {
      if (arr[r - 1][c - 1] === -1) {
        cleaner.push([r, c]);
        grid[r][c] = 0;
      } else grid[r][c] = arr[r - 1][c - 1];
    }
  }

  function spread(r, c, curGrid, nextGrid) {
    const dust = Math.floor(curGrid[r][c] / 5);
    let count = 0;

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (
        nr > 0 &&
        nr <= R &&
        nc > 0 &&
        nc <= C &&
        !(nr === cleaner[0][0] && nc === cleaner[0][1]) &&
        !(nr === cleaner[1][0] && nc === cleaner[1][1])
      ) {
        nextGrid[nr][nc] += dust;
        count++;
      }
    }

    nextGrid[r][c] -= dust * count;
  }

  function clean(grid) {
    const nextGrid = grid.map((v) => [...v]);
    const [upperCleanerR, upperCleanerC] = cleaner[0];
    const [lowerCleanerR, lowerCleanerC] = cleaner[1];

    // 위쪽 공기청정기 -> 반시계방향 순환
    for (let r = 1; r < upperCleanerR; r++) {
      nextGrid[r + 1][1] = grid[r][1];
      nextGrid[r][C] = grid[r + 1][C];
    }
    for (let c = 1; c < C; c++) {
      nextGrid[1][c] = grid[1][c + 1];
      nextGrid[upperCleanerR][c + 1] = grid[upperCleanerR][c];
    }

    // 아래쪽 공기청정기 -> 시계방향 순환
    for (let r = lowerCleanerR; r < R; r++) {
      nextGrid[r][1] = grid[r + 1][1];
      nextGrid[r + 1][C] = grid[r][C];
    }
    for (let c = 1; c < C; c++) {
      nextGrid[lowerCleanerR][c + 1] = grid[lowerCleanerR][c];
      nextGrid[R][c] = grid[R][c + 1];
    }

    // 공기청정기로 들어간 먼지 정화
    nextGrid[upperCleanerR][upperCleanerC] = 0;
    nextGrid[lowerCleanerR][lowerCleanerC] = 0;

    return nextGrid;
  }

  for (let i = 0; i < T; i++) {
    const curGrid = grid.map((v) => [...v]);
    const spreadGrid = grid.map((v) => [...v]);

    for (let r = 1; r <= R; r++) {
      for (let c = 1; c <= C; c++) {
        if (grid[r][c] > 0) {
          spread(r, c, curGrid, spreadGrid);
        }
      }
    }

    grid = clean(spreadGrid);
  }

  return grid.reduce((acc, cur) => acc + cur.reduce((a, c) => a + c, 0), 0);
}

console.log(solution(R, C, T, arr));
