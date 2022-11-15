function solution(progresses, speeds) {
  const answer = [];
  let index = 0;

  while (progresses.length > answer.reduce((acc, cur) => acc + cur, 0)) {
    let count = 0;

    for (let i = 0; i < progresses.length; i++) {
      if (progresses[i] < 100) progresses[i] += speeds[i];
    }

    while (progresses[index] >= 100) {
      count++;
      index++;
    }

    if (count > 0) answer.push(count);
  }

  return answer;
}
