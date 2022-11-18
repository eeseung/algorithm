function solution(arr1, arr2) {    
  return arr1.map((arr, i) => arr.map((e, j) => e + arr2[i][j]));
}
