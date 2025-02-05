const ContactBook = {
  contacts: [
    { name: "Олександр", phone: "+380501234567", email: "olex@example.com" },
    { name: "Марія", phone: "+380671234567", email: "maria@example.com" },
    { name: "Степан", phone: "+380671233567", email: "stepan@example.com" },
  ],

  addContact(name, phone, email) {
    this.contacts.push({ name, phone, email });
    console.log(`Контакт ${name} додано.`);
  },

  findContact(name) {
    if (!name) return "Будь ласка, вкажіть ім'я для пошуку.";

    const contact = this.contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    return contact ? contact : `Контакт "${name}" не знайдено.`;
  },
};

// Приклад використання:
ContactBook.addContact("Іван", "+380931234567", "ivan@example.com");
console.log(ContactBook.findContact("Марія"));
console.log(ContactBook.findContact("Андрій"));
console.table(ContactBook.contacts);
