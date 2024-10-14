function solution(want, number, discount) {
  const wantObj = {};
  let answer = 0;

  for (let i = 0; i < want.length; i++) {
    const product = want[i];
    wantObj[product] = number[i];
  }

  for (let i = 0; i < discount.length - 9; i++) {
    const discountedWant = { ...wantObj };

    for (let j = 0; j < 10; j++) {
      const index = i + j;
      const product = discount[index];

      if (product in discountedWant) {
        discountedWant[product] -= 1;
      } else {
        break;
      }
    }

    if (Object.values(discountedWant).every((v) => v === 0)) answer += 1;
  }

  return answer;
}
