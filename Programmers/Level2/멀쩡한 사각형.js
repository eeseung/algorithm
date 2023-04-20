function solution(w, h) {
  let count = 0; // 겹치는 부분
  
  for (let i = 0; i < w; i++) {
    count += Math.ceil(h * (i + 1) / w) - Math.floor(h * i / w);
  }   
  
  return w * h - count;
}
