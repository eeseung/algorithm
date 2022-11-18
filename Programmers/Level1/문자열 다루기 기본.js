function solution(s) {
  return (s.length === 4 || s.length === 6) && s.split('').every(e => 0 <= e && e <=9);
}

// 다른 풀이: 정규 표현식 - test
function solution(s) {
  return /^\d{6}$|^\d{4}$/.test(s);
}
