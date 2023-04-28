function solution(sequence, k) {
  let start = 0, end = 0;
  let sum = sequence[0];
  const answer = [];
  
  while (end < sequence.length) {
    if (sum > k) {
      sum -= sequence[start];
      start++;
    } else {
      if (sum === k) answer.push([start, end]);
      end++;
      sum += sequence[end];
    }
  }
  
  return answer.sort((a, b) => {
    const len = Math.abs(a[0] - a[1]) - Math.abs(b[0] - b[1]);
    if (len ===  0) return a[0] - b[0];
    else return len;
  })[0];
}
