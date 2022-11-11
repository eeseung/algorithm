function solution(s) { // 정규 표현식 - match
  return s.match(/p/ig)?.length === s.match(/y/ig)?.length;
}
