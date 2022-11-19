function solution(numbers) {
  const answer = numbers.map(String).sort((a, b) => (b + a) - (a + b)).join('');

  return answer[0] === '0' ? '0' : answer; 
}

// 다른 풀이: 템플릿 리터럴 ``
function solution(numbers) {
  const answer = numbers.sort((a, b) => `${b}${a}` - `${a}${b}`).join('');

  return answer[0] === '0' ? '0' : answer; 
}
