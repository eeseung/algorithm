function solution(A, B) {
  const sortedA = A.sort((a, b) => a - b);
  const sortedB = B.sort((a, b) => b - a);
  
  return sortedA.reduce((a, c, i) => a + c * sortedB[i], 0);
}
