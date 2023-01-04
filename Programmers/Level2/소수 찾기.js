function solution(numbers) {
  const nums = numbers.split('');
  const answer = new Set();

  function permute(arr, num) {
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        const newNum = parseInt(num + arr[i]);
        const newArr = [...arr];
        newArr.splice(i, 1);

        if (!answer.has(newNum) && isPrime(newNum)) answer.add(parseInt(newNum));
        permute(newArr, newNum);
      }
    }
  }

  permute(nums, "");

  return answer.size;
}

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }

  return true;
}
