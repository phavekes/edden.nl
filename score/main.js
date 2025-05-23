import React, { useState, useEffect } from 'https://esm.sh/react';
import ReactDOM from 'https://esm.sh/react-dom/client';

function App() {
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('EDDEN_WEB_STATE');
    if (saved) {
      const data = JSON.parse(saved);
      setPlayers(data.players || []);
      setRounds(data.rounds || []);
    } else {
      setPlayers([
        { id: '1', name: 'Player1', score: 0 },
        { id: '2', name: 'Player2', score: 0 },
        { id: '3', name: 'Player3', score: 0 },
        { id: '4', name: 'Player4', score: 0 }
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('EDDEN_WEB_STATE', JSON.stringify({ players, rounds }));
  }, [players, rounds]);

  const addPoints = (index, points) => {
    const updated = [...players];
    updated[index].score += points;
    setPlayers(updated);
  };

  const resetGame = () => {
    setPlayers([]);
    setRounds([]);
    localStorage.removeItem('EDDEN_WEB_STATE');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>EddenApp Web</h1>
      <button onClick={resetGame}>Restart Game</button>
      <ul>
        {players.map((p, i) => (
          <li key={p.id}>
            {p.name}: {p.score}
            <input
              type="number"
              placeholder="Add points"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  addPoints(i, parseInt(e.target.value || '0', 10));
                  e.target.value = '';
                }
              }}
            />
          </li>
        ))}
      </ul>
      <a href="https://edden.nl" target="_blank">Rules (edden.nl)</a>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);