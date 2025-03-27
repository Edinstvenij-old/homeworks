function getTotalSalary(department) {
  if (Array.isArray(department)) {
    return department.reduce((sum, employee) => sum + employee.salary, 0);
  } else {
    return Object.values(department).reduce(
      (sum, subDep) => sum + getTotalSalary(subDep),
      0
    );
  }
}

let company = {
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 600 },
  ],
  development: {
    web: [
      { name: "Peter", salary: 2000 },
      { name: "Alex", salary: 1800 },
    ],
    internals: [{ name: "Jack", salary: 1300 }],
  },
};

console.log(getTotalSalary(company)); // 6700
