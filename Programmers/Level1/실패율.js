function solution(N, stages) {
  const rates = [...new Array(N)].map((_, i) => ({ rate: 0, index: i + 1 }));
  let player = stages.length;
  let count = 0;

  for (let i = 0; i < N; i++) {
    if (i > 0) player -= count;
    count = stages.filter((n) => n === i + 1).length;
    rates[i].rate = count / player;
  }

  return rates.sort((a, b) => b.rate - a.rate).map((v) => v.index);
}
