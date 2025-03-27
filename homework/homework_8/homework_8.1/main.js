let ladder = {
  step: 0,

  up: function () {
    this.step++;
    return this;
  },

  down: function () {
    this.step--;
    return this;
  },

  showStep: function () {
    console.log(this.step);
    return this;
  },
};

ladder.up().up().down().showStep(); // 1

//  Для поднятия настроения, c юмором из Одессы))))
// Песня "Школа Соломона Пляра" )))))))

// let dance = {
//   step: 0,

//   up: function () {
//     this.step++;
//     return this;
//   },

//   down: function () {
//     this.step--;
//     return this;
//   },

//   left: function () {
//     this.step -= 1;
//     return this;
//   },

//   right: function () {
//     this.step += 1;
//     return this;
//   },

//   showStep: function () {
//     console.log(`Поточна позиція: ${this.step}`);
//     return this;
//   },
// };

// dance.left().left().right().right().up().down().down().showStep(); // -1
