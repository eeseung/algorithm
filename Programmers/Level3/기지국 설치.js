function solution(n, stations, w) {
  let stationIndex = 0;
  let index = 1;
  let answer = 0;

  while (index <= n) {
    const station = stations[stationIndex];

    if (index >= station - w && index <= station + w) {
      index = station + w + 1;
      stationIndex++;
    } else {
      // 전파가 전달되는 아파트가 아닌 경우 기지국 설치 후 인덱스 이동
      index += 2 * w + 1;
      answer++;
    }
  }

  return answer;
}
