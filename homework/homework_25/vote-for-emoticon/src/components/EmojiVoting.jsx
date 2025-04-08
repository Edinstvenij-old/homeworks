import React, { useState, useEffect } from "react";

const EmojiVoting = () => {
  const emojis = [
    { symbol: "😊", votes: 0 },
    { symbol: "😂", votes: 0 },
    { symbol: "😍", votes: 0 },
    { symbol: "😎", votes: 0 },
    { symbol: "🥺", votes: 0 },
  ];

  // Загрузка сохранённых голосов из localStorage или установка начальных значений
  const [emojiVotes, setEmojiVotes] = useState(() => {
    try {
      const savedVotes = localStorage.getItem("emojiVotes");
      return savedVotes ? JSON.parse(savedVotes) : emojis;
    } catch (e) {
      console.error("Ошибка при загрузке из localStorage", e);
      return emojis; // Если данные повреждены, возвращаем начальные значения
    }
  });

  // Синхронизация emojiVotes с localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem("emojiVotes", JSON.stringify(emojiVotes));
    } catch (e) {
      console.error("Ошибка при записи в localStorage", e);
    }
  }, [emojiVotes]);

  // Обработчик клика по смайлику
  const handleVote = (symbol) => {
    const updatedVotes = emojiVotes.map((emoji) =>
      emoji.symbol === symbol ? { ...emoji, votes: emoji.votes + 1 } : emoji
    );
    setEmojiVotes(updatedVotes);
  };

  // Показать результаты
  const handleShowResults = () => {
    const maxVotes = Math.max(...emojiVotes.map((emoji) => emoji.votes));
    const winningEmoji = emojiVotes.find((emoji) => emoji.votes === maxVotes);
    alert(`Перемог смайл: ${winningEmoji.symbol} з ${maxVotes} голосами!`);
  };

  // Очистить результаты
  const handleClearResults = () => {
    const resetVotes = emojis.map((emoji) => ({ ...emoji, votes: 0 }));
    setEmojiVotes(resetVotes);
  };

  return (
    <div className="emoji-voting">
      <h1 className="title">Голосування за смайлики</h1>
      <div className="emoji-list">
        {emojiVotes.map((emoji) => (
          <div
            key={emoji.symbol}
            className="emoji-item"
            onClick={() => handleVote(emoji.symbol)}
          >
            <span className="emoji">{emoji.symbol}</span>
            <div className="vote-count">Голосів: {emoji.votes}</div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button className="show-results" onClick={handleShowResults}>
          Показати результати
        </button>
        <button className="clear-results" onClick={handleClearResults}>
          Очистити результати
        </button>
      </div>
    </div>
  );
};

export default EmojiVoting;
