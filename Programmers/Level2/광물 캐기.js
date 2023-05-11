function addFatigue(result, counts, fatigues) {
  for (let i = 0; i < 3; i++) {
    result += counts[i] * fatigues[i];
  }
      
  return result;
}

function solution(picks, minerals) {
  const counts = [];
  let pickCount = picks[0] + picks[1] + picks[2];
  let answer = 0;
  
  // 광물 5개씩 묶기
  for (let i = 0; i < minerals.length; i += 5) {
    const count = [0, 0, 0];
    if (pickCount === 0) break; // 곡괭이 없는 경우 더 이상 광물 못 캠
          
    for (let j = i; j < i + 5; j++) {
        if (minerals[j] === 'diamond') count[0]++;
        if (minerals[j] === 'iron') count[1]++;
        if (minerals[j] === 'stone') count[2]++;
    }
      
    pickCount--;
    counts.push(count);
  }
  
  // 피로도 큰 순으로 정렬
  counts.sort((a, b) => {
    if (a[0] === b[0] && a[1] === b[1]) return b[2] - a[2];
    else if (a[0] === b[0]) return b[1] - a[1];
    else return b[0] - a[0];
  })
  
  // 다이아, 철, 돌 곡괭이 순으로 피로도 소모
  for (let i = 0; i < picks[0]; i++) {
    if (counts[i]) answer = addFatigue(answer, counts[i], [1, 1, 1]);
  }
  
  for (let i = picks[0]; i < picks[0] + picks[1]; i++) {
    if (counts[i]) answer = addFatigue(answer, counts[i], [5, 1, 1]);
  }
  
  for (let i = picks[0] + picks[1]; i < picks[0] + picks[1] + picks[2]; i++) {
    if (counts[i]) answer = addFatigue(answer, counts[i], [25, 5, 1]);
  }
  
  return answer;
}
