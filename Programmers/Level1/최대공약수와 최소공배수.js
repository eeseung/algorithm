function solution(n, m) {
  return [calculateGCD(n, m), calculateLCM(n, m)];
}

function calculateGCD(n, m) {
  let max_value = 1;

  for (let i = 1; i <= Math.min(n, m); i++) {
    if (n % i === 0 && m % i === 0) max_value = Math.max(max_value, i);
  }

  return max_value;
}

function calculateLCM(n, m) {
  let min_value = n * m;

  for (let i = Math.max(n, m); i <= n * m; i++) {
    if (i % n === 0 && i % m === 0) min_value = Math.min(min_value, i);
  }

  return min_value;
}

// 다른 풀이: 유클리드 호제법
function solution(n, m) {
  return [calcGCD(n, m), calcLCM(n, m)];
}

function calcGCD(n, m) {
  return m === 0 ? n : calcGCD(m, n % m);
}

function calcLCM(n, m) {
  return (n * m) / calcGCD(n, m);
}
