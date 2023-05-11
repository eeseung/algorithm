function solution(data, col, row_begin, row_end) {
  const sorted = data.sort((a, b) => a[col - 1] === b[col - 1] ? b[0] - a[0] : a[col - 1] - b[col - 1]);
  const S = sorted.map((v, i) => {
    let sum = 0;
    for (let j = 0; j < v.length; j++) {
        sum += v[j] % (i + 1);
    }
    return sum;
  });
  let answer = 0;
  
  for (let i = row_begin - 1; i < row_end; i++) {
    answer = answer ^ S[i];
  }
  
  return answer;
}
