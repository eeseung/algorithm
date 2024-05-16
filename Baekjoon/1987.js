// 알파벳
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [R, C] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(""));

function solution(R, C, arr) {
  const alphabet = Array.from({ length: 26 }).fill(false);
  let answer = 0;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  function dfs(x, y, count) {
    answer = Math.max(count, answer);

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;

      const charCode = arr[nx][ny].charCodeAt(0) - 65;
      if (!alphabet[charCode]) {
        alphabet[charCode] = true;
        dfs(nx, ny, count + 1);
        alphabet[charCode] = false;
      }
    }
  }

  alphabet[arr[0][0].charCodeAt(0) - 65] = true;
  dfs(0, 0, 1);

  return answer;
}

console.log(solution(R, C, arr));
