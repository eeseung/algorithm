function solution(dirs) {
  const visited = [];
  let x = 0,
    y = 0;
  let answer = 0;

  const dy = { U: 1, D: -1, R: 0, L: 0 };
  const dx = { U: 0, D: 0, R: 1, L: -1 };

  for (const d of dirs) {
    const nx = x + dx[d];
    const ny = y + dy[d];
    let visit;

    if (nx > 5 || nx < -5 || ny > 5 || ny < -5) continue;

    if (d === 'U' || d === 'D') visit = `${nx}, ${(y + ny) / 2}`;
    else visit = `${(x + nx) / 2}, ${ny}`;

    if (!visited.includes(visit)) {
      answer++;
      visited.push(visit);
    }

    x = nx;
    y = ny;
  }

  return answer;
}
