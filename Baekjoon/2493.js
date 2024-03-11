// 탑
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const N = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);

function solution(N, arr) {
  const tower = [];
  const answer = [];

  for (let i = 0; i < N; i++) {
    const current = {
      index: i + 1,
      height: arr[i],
    };

    if (tower.length === 0) {
      tower.push(current);
      answer.push(0);
      continue;
    }

    if (tower[tower.length - 1].height < current.height) {
      while (tower.length) {
        if (tower[tower.length - 1].height >= current.height) break;
        else tower.pop();
      }
    }

    answer.push(!tower.length ? 0 : tower[tower.length - 1].index);
    tower.push(current);
  }

  return answer.join(" ");
}

console.log(solution(N, arr));
