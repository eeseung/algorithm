function solution(participant, completion) {
  const players = {};

  for (const p of participant) {
    if (p in players) {
      players[p]++;
    } else {
      players[p] = 1;
    }
  }

  for (const c of completion) {
    players[c]--;
  }

  for (const name in players) {
    if (players[name] > 0) return name;
  }
}
