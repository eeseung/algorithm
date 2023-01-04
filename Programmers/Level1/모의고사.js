function solution(answers) {
  const first = [1, 2, 3, 4, 5];
  const second = [2, 1, 2, 3, 2, 4, 2, 5];
  const third = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  const answer = Array.from({length: 3}, (_, i) => ({index: i + 1, score: 0}));
  
  answers.forEach((a, i) => {
    if (a === first[i % 5]) answer[0].score++;
    if (a === second[i % 8]) answer[1].score++;
    if (a === third[i % 10]) answer[2].score++;
  })
  
  return answer.filter(e => e.score === Math.max(...answer.map(e => e.score))).map(e => e.index).sort((a, b) => a - b);
}
