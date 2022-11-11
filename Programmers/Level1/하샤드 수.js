function solution(x) {
  return x % x.toString().split('').reduce((acc, cur) => acc + parseInt(cur), 0) === 0;
}
