function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
for (let index = 0; index < 6; index++) {
  console.log(getRandomIntInclusive(1, 60));
}
