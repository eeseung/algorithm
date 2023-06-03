// 올바른 괄호 문자열 확인
function isCorrect(str) {
  let count = 0;

  for (const s of str) {
    count += s === '('? 1: -1;
    if (count < 0) return false;
  }

  return count === 0;
}

// 균형잡힌 괄호 문자열 확인
function isBalanced(str) {
  return str.split('').filter(v => v === '(').length === str.length / 2;
}

// 문자열 괄호 방향 뒤집기
function reverse(str) {
  let result = '';
  
  for (const s of str) {
    if (s === '(') result += ')';
    else result += '(';
  }
  
  return result;
}

// 올바른 괄호 문자열로 변환
function convert(str) {
  let result = '';
  
  if (str.length === 2) {
    if (isCorrect(str.slice(0, 2))) return str;
    else return reverse(str);
  }
  
  for (let i = 2; i <= str.length; i += 2) {
    const u = str.slice(0, i);
      
    if (isBalanced(u)) {
      const v = str.slice(i, str.length);
          
      if (isCorrect(u)) {
        result = u;
        result += convert(v);
      } else {
        result = '(' + convert(v) + ')';
        result += reverse(u.slice(1, -1));
      }
      break;
    }
  }
  
  return result;
}

function solution(p) {
  if (isCorrect(p)) return p;
  else return convert(p);
}
