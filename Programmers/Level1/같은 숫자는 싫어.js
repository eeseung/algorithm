function solution(arr) {
  const answer = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) answer.push(arr[i]);
  }

  return answer;
}

// 다른 풀이: filter
function solution(arr) {
  return arr.filter((e, i) => e !== arr[i + 1]);
}
