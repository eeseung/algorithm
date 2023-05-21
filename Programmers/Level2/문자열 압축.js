function solution(s) {
  let answer = s.length;
  
  function compression(num) {
      const str = [];
      const cmp = [];
      
      for (let i = 0; i < s.length / num; i++) {
          str.push(s.slice(i * num, i * num + num));
      }
      
      cmp.push({str: str[0], count: 1});
      
      for (let i = 1; i < str.length; i++) {
          if (str[i] === cmp[cmp.length - 1].str) cmp[cmp.length - 1].count++;
          else cmp.push({str: str[i], count: 1});
      }
      
      return cmp.map(v => `${v.count > 1 ? v.count : ''}${v.str}`).join('');
  }
  
  for (let i = 1; i <= parseInt(s.length / 2); i++) {
      const cmpStr = compression(i);
      answer = Math.min(answer, cmpStr.length);
  }

  return answer;
}
