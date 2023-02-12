function solution(s) {
  const numbers = s.split(' ').map(Number); // s.split(' '); 가능

  return `${Math.min(...numbers)} ${Math.max(...numbers)}`;
}
