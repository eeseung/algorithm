function solution(phone_number) {
  return phone_number.slice(0, -4).replace(/[0-9]/gi, '*') + phone_number.slice(-4);
}

// 다른 풀이 1: 정규 표현식 - replace
function solution(phone_number) {
  return phone_number.replace(/\d(?=\d{4})/g, '*');
}

// 다른 풀이 2: repeat()
function solution(phone_number) {
  return '*'.repeat(phone_number.length - 4) + phone_number.slice(-4);
}
