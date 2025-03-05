function solution(n, left, right) {
  const arr = [];

  for (let i = left; i <= right; i++) {
    const quotient = Math.floor(i / n);
    const remainder = i % n;
    if (quotient === n - 1 || remainder === n - 1) {
      arr.push(n);
    } else {
      arr.push(Math.max(quotient, remainder) + 1);
    }
  }

  return arr;
}
