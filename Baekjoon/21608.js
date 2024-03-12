// 상어 초등학교
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(N, arr) {
  const grid = Array.from({ length: N }, () => Array(N).fill(0));
  let answer = 0;

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  // 비어있는 칸 구하기
  const getBlanks = () => {
    const returnSpaces = [];

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (grid[r][c] === 0) returnSpaces.push([r, c]);
      }
    }

    return returnSpaces;
  };

  // 인접한 칸 중 조건에 맞는 칸 카운트 (조건: favorites 있으면 좋아하는 학생, 없으면 빈 칸 여부)
  const getAdjoiningCount = (r, c, favorites) => {
    let count = 0;

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
      if (favorites) {
        if (favorites.includes(grid[nr][nc])) count++;
      } else {
        if (grid[nr][nc] === 0) count++;
      }
    }

    return count;
  };

  // 1. 좋아하는 학생이 인접한 칸에 가장 많은 칸 구하기
  const getAdjoiningStudents = (spaces, numbers) => {
    const sortedSpaces = spaces.map(([r, c]) => [r, c, getAdjoiningCount(r, c, numbers)]).sort((a, b) => b[2] - a[2]);
    return sortedSpaces.filter((space) => space[2] === sortedSpaces[0][2]);
  };

  // 2. 인접한 칸 중에서 비어있는 칸이 가장 많은 칸 구하기
  const getAdjoiningBlanks = (spaces) => {
    const sortedSpaces = spaces.map(([r, c]) => [r, c, getAdjoiningCount(r, c)]).sort((a, b) => b[2] - a[2]);
    return sortedSpaces.filter((space) => space[2] === sortedSpaces[0][2]);
  };

  for (let i = 0; i < N ** 2; i++) {
    const blankSpaces = getBlanks();
    const firstSpaces = getAdjoiningStudents(blankSpaces, arr[i].slice(1));
    const secondSpaces = getAdjoiningBlanks(firstSpaces);
    const [r, c] = secondSpaces.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))[0]; // 3. 행의 번호가 가장 작은 칸, 열의 번호가 가장 작은 칸으로 자리 구하기
    grid[r][c] = arr[i][0];
  }

  // 만족도 합 계산
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const numbers = arr.find((v) => v[0] === grid[r][c]).slice(1);
      const count = getAdjoiningCount(r, c, numbers);
      if (count > 0) answer += 10 ** (count - 1);
    }
  }

  return answer;
}

console.log(solution(N, arr));
