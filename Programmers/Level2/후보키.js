function combination(arr, selectNum) {
  const result = [];

  if (selectNum === 1) return arr.map(v => [v]);

  arr.forEach((fixed, i, arr) => {
    const rest = arr.slice(i + 1);
    const c = combination(rest, selectNum - 1);
    const r = c.map(v => [fixed, ...v]);

    result.push(...r);
  })

  return result;
}

function solution(relation) {
  const attributes = Array.from({length: relation[0].length}, (_, i) => i + 1);
  const keyArr = [];

  for (let i = 1; i <= relation[0].length; i++) {
    for (const keyC of combination(attributes, i)) { // 키 조합
      if (keyArr.some(k => k.every(v => keyC.includes(v)))) continue; // 모든 속성이 이미 후보키에 포함되어 있는 경우(최소성 X)

      const tSet = new Set(); // 튜플 중복 제거를 위한 Set
      const tArr = Array(relation.length).fill('');

      for (const key of keyC) {
        for (let i = 0; i < relation.length; i++) {
          tArr[i] += relation[i][key - 1];
        }
      }

      for (const t of tArr) {
        tSet.add(t);
      }

      if (tSet.size === relation.length) keyArr.push(keyC); // 릴레이션 로우 길이와 같으면 유일성 O -> 후보키
    }
  }

  return keyArr.length;
}
