import React, { useState, useEffect } from "react";

const EmojiVoting = () => {
  const emojis = [
    { symbol: "😊", votes: 0 },
    { symbol: "😂", votes: 0 },
    { symbol: "😍", votes: 0 },
    { symbol: "😎", votes: 0 },
    { symbol: "🥺", votes: 0 },
  ];

  const [emojiVotes, setEmojiVotes] = useState(() => {
    try {
      const savedVotes = localStorage.getItem("emojiVotes");
      if (savedVotes) {
        return JSON.parse(savedVotes);
      } else {
        return emojis;
      }
    } catch (e) {
      console.error("Ошибка при загрузке из localStorage", e);
      return emojis;
    }
  });

  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("emojiVotes", JSON.stringify(emojiVotes));
    } catch (e) {
      console.error("Ошибка при записи в localStorage", e);
    }
  }, [emojiVotes]);

  const handleVote = (symbol) => {
    const updatedVotes = emojiVotes.map((emoji) =>
      emoji.symbol === symbol ? { ...emoji, votes: emoji.votes + 1 } : emoji
    );
    setEmojiVotes(updatedVotes);
  };

  const handleShowResults = () => {
    const maxVotes = Math.max(...emojiVotes.map((emoji) => emoji.votes));
    if (maxVotes === 0) {
      setResultData({ message: "Ще ніхто не голосував.", emojis: [] });
      return;
    }
    const winners = emojiVotes.filter((emoji) => emoji.votes === maxVotes);
    setResultData({
      message: `Кількість голосів: ${maxVotes}`,
      emojis: winners.map((e) => e.symbol),
    });
  };

  const handleClearResults = () => {
    const resetVotes = emojis.map((emoji) => ({ ...emoji, votes: 0 }));
    setEmojiVotes(resetVotes);
    setResultData(null);
    localStorage.removeItem("emojiVotes");
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
            <div className="vote-count">голосів: {emoji.votes}</div>
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

      {resultData && (
        <div className="result">
          <div className="result-title">Результати голосування:</div>
          <div className="winner-text">Переможець(і):</div>
          {resultData.emojis.length > 0 && (
            <div className="winners">
              {resultData.emojis.map((symbol) => (
                <span key={symbol} className="winner-emoji">
                  {symbol}
                </span>
              ))}
            </div>
          )}
          <div>{resultData.message}</div>
        </div>
      )}
    </div>
  );
};

export default EmojiVoting;
