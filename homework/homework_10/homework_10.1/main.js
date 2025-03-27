class User {
  constructor(name, age, location, email, phone) {
    this.name = name;
    this.age = age;
    this.location = location;
    this.email = email;
    this.phone = phone;
  }

  getInfo() {
    return `Ім'я: ${this.name}, Вік: ${this.age}, Місце проживання: ${this.location}, Email: ${this.email}, Телефон: ${this.phone}`;
  }
}

const user1 = new User(
  "Олена",
  25,
  ",Київ, Україна",
  "olena@example.com",
  "+380987654321"
);
console.log(user1.getInfo());

const user2 = new User(
  "Степан",
  30,
  "Львів, Україна",
  "stepan@example.com",
  "+380123456789"
);
console.log(user2.getInfo());
