function solution(storey) {
  const arr = [0, ...storey.toString().split('').map(Number)].reverse();
  let answer = 0;

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];

    if (num > 5) {
      answer += 10 - num;
      arr[i + 1]++;
    } else if (num === 5) {
      if (arr[i + 1] >= 5) {
        answer += 10 - num;
        arr[i + 1]++;
      } else answer += num;
    } else {
      answer += num;
    }
  }

  return answer;
}
