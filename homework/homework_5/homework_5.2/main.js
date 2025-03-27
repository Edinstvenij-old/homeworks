const exchangeRate = 26;
for (let dollars = 10; dollars <= 100; dollars += 10) {
  const price = dollars * exchangeRate;
  console.log(`${dollars} доларів = ${price} гривень`);
}
