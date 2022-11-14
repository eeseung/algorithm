function solution(clothes) {
  const obj = {};
  let answer = 1;

  for (const arr of clothes) {
    if (obj.hasOwnProperty(arr[1])) {
      obj[arr[1]].push(arr[0]);
    } else {
      obj[arr[1]] = [arr[0]];
    }
  }

  for (const arr of Object.values(obj)) {
    answer *= (arr.length + 1);
  }

  return answer - 1;
}

// 다른 풀이 1: 의상 개수만 이용
function solution(clothes) {
  const obj = {};
  let answer = 1;

  for (const arr of clothes) {
    obj[arr[1]] = (obj[arr[1]] || 0) + 1;
  }

  for (const count of Object.values(obj)) {
    answer *= (count + 1);
  }

  return answer - 1;
}

// 다른 풀이 2: reduce(의상 개수만 이용)
function solution(clothes) {
  return Object.values(clothes.reduce((acc, cur) => {
    acc[cur[1]] = acc[cur[1]] ? acc[cur[1]] + 1 : 1;
    return acc;
  }, {})).reduce((acc, cur) => acc * (cur + 1), 1) - 1;    
}
