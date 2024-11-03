const removeElement = (nums, val) => {
  let output = [];
  for (let i = 0; i < nums.length; i++) {
    const result = nums[i] !== val;
    if (result) {
      output.push(nums[i]);
    }
  }
  return output;
};

console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));
