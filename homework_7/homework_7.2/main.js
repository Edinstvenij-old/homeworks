function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const result = multiply(7)(3);

console.log(result);
