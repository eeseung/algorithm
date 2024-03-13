// 케이크 자르기
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");
const [N, M, L] = input[0].split(" ").map(Number);
const sArr = input
  .slice(1, M + 1)
  .map(Number)
  .concat(L); // 마지막 케이크 길이까지
const qArr = input.slice(M + 1).map(Number);

function solution(Q, L, sArr) {
  let left = 0;
  let right = L;
  let answer = 0;

  const check = (mid, q) => {
    let prev = 0;
    for (let i = 0; i < sArr.length; i++) {
      if (sArr[i] - prev >= mid) {
        q--;
        prev = sArr[i];
      }
    }
    return q < 0;
  };

  while (left <= right) {
    let mid = parseInt((left + right) / 2); // 임의의 가장 작은 조각 길이

    if (check(mid, Q)) {
      answer = Math.max(answer, mid);
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

for (let i = 0; i < N; i++) {
  console.log(solution(qArr[i], L, sArr));
}
