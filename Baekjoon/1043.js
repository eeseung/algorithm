// 거짓말
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
const mArr = input.slice(2).map((v) => v.split(" ").map(Number));

function solution(N, M, arr, mArr) {
  const visited = Array(M).fill(false);
  const queue = [];
  let answer = M;

  for (let i = 1; i <= arr[0]; i++) {
    queue.push(arr[i]);
  }

  while (queue.length) {
    const cur = queue.shift();
    for (let i = 0; i < M; i++) {
      const [pCount, ...pNums] = mArr[i];
      if (pNums.includes(cur) && !visited[i]) {
        for (const pNum of pNums) {
          if (pNum !== cur) queue.push(pNum);
        }
        visited[i] = true;
        answer--;
      }
    }
  }

  return answer;
}

console.log(solution(N, M, arr, mArr));
