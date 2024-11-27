function solution(s) {
  let answer = 0;

  const isCorrect = (str) => {
    const stack = [];

    for (const bracket of str) {
      if (
        (stack[stack.length - 1] === '[' && bracket === ']') ||
        (stack[stack.length - 1] === '(' && bracket === ')') ||
        (stack[stack.length - 1] === '{' && bracket === '}')
      )
        stack.pop();
      else stack.push(bracket);
    }

    return stack.length === 0;
  };

  for (let i = 0; i < s.length; i++) {
    const str = s.slice(i, s.length) + s.slice(0, i);
    if (isCorrect(str)) answer++;
  }

  return answer;
}
