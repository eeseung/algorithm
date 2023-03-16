// 양궁대회
// 2022 KAKAO BLIND RECRUITMENT
function combinationR(arr, selectNum) { // 중복조합
  const result = [];

  if (selectNum === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, i, arr) => {
    const rest = arr.slice(i);
    const cmb = combinationR(rest, selectNum - 1);
    const r = cmb.map((v) => [fixed, ...v]);

    result.push(...r);
  });

  return result;
}

function solution(n, info) {
  const score = Array.from({ length: 11 }, (_, i) => i);
  let maxDiff = 0;
  let answer = [];

  // 라이언이 화살 쏜 모든 경우 탐색
  for (const ryan of combinationR(score, n)) {
    const ryanInfo = Array.from(Array(11).fill(0)); // 라이언이 맞힌 과녁 점수의 개수(10 ~ 0)
    let apeachScore = 0;
    let ryanScore = 0;

    for (const r of ryan) {
      ryanInfo[10 - r]++;
    }

    // 라이언 & 어피치 최종 점수 계산
    for (let i = 0; i <= 10; i++) {
      if (ryanInfo[i] === 0 && info[i] === 0) continue;
      if (ryanInfo[i] > info[i]) ryanScore += 10 - i;
      else apeachScore += 10 - i;
    }

    // 라이언이 가장 큰 점수 차이로 우승하는 경우
    if (ryanScore - apeachScore > maxDiff) {
      maxDiff = ryanScore - apeachScore;
      answer = [ryanInfo];
    } else if (ryanScore - apeachScore === maxDiff) {
      answer.push(ryanInfo);
    }
  }

  if (maxDiff === 0) return [-1];
  return answer.sort((a, b) => {
    for (let i = 10; i >= 0; i--) {
      if (a[i] > b[i]) return a - b;
    }
  })[0];
}
