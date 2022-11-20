function solution(sizes) { // 정렬, Math.max()
  const sorted = sizes.map(size => size.sort((a, b) => a - b));

  return Math.max(...sorted.map(e => e[0])) * Math.max(...sorted.map(e => e[1]));
}

// 다른 풀이: 완전 탐색
function solution(sizes) {
  const sorted = sizes.map(size => size.sort((a, b) => a - b));
  let maxWidth = 0, maxHeight = 0;

  for (const [w, h] of sorted) {
    if (w > maxWidth) maxWidth = w;
    if (h > maxHeight) maxHeight = h;
  }

  return maxWidth * maxHeight;
}
