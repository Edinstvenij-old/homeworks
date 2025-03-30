const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// 📌 Получить все задачи
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 Создать новую задачу
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({ title: req.body.title });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 📌 Обновить задачу (по id)
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 📌 Удалить задачу (по id)
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Завдання видалено" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
