function solution(nums) {
  const arr = [...new Set(nums)];
  const max = nums.length / 2;

  return arr.length > max ? max : arr.length;
}
