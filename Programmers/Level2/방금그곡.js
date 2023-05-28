function getPitches(str) {
  const result = [];
  
  for (const s of str.split('')) {
    if (s === '#') result[result.length - 1] = result[result.length - 1] + '#';
    else result.push(s);
  }
  
  return result;
}

function solution(m, musicinfos) {
  const mArr = getPitches(m);
  const answer = [];
  
  for (const music of musicinfos) {
    const [start, end, title, pitch] = music.split(',');
    const startTime = start.split(':').map(Number);
    const endTime = end.split(':').map(Number);
    const time = Math.abs(endTime[0] * 60 + endTime[1] - startTime[0] * 60 - startTime[1]);      const allPitchArr = getPitches(pitch.repeat(Math.ceil(time / pitch.replace('#', '').length))).slice(0, time);
    let idx = 0;
      
    for (let i = 0; i < allPitchArr.length; i++) {
      if (allPitchArr[i] === mArr[idx]) {
        if (idx === mArr.length - 1) {
          answer.push({title: title, duration: time, index: answer.length});
          break;
        }
        idx++;
      } else if (allPitchArr[i] === mArr[0]) idx = 1;
      else idx = 0;
    }
  }
}

// 다른 풀이: C#, D#, F#, G#, A# -> 다른 문자로 바꾸기
function normalize(melody) {
  return melody.replace(/([A-Z])#/g, (_, a) => a.toLowerCase());
}

function solution(m, musicinfos) {
  const melody = normalize(m);
  const answer = [];
  
  for (const music of musicinfos) {
    const [start, end, title, pitch] = music.split(',');
    const startTime = start.split(':').map(Number);
    const endTime = end.split(':').map(Number);
    const time = Math.abs(endTime[0] * 60 + endTime[1] - startTime[0] * 60 - startTime[1]);
    const pitches = normalize(pitch.repeat(Math.ceil(time / pitch.replace('#', '').length))).slice(0, time);
      
    if (pitches.includes(melody)) answer.push({title: title, duration: time, index: answer.length});
  }
  
  return answer.length > 0 ? answer.sort((a, b) => a.duration === b.duration ? a.index - b.index : b.duration - a.duration)[0].title : '(None)';
}
