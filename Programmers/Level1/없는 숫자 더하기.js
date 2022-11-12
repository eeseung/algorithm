function solution(numbers) {
  return Array.from({length: 10}, (_, i) => i).filter(e => !numbers.includes(e)).reduce((acc, cur) => acc + cur, 0);
}

// 다른 풀이: 전체에서 있는 숫자 빼기
function solution(numbers) {
  return 45 - numbers.reduce((acc, cur) => acc + cur, 0);
}
